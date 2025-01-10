require('dotenv').config();
const hyper = require("@juspay-tech/hyperswitch-node")(
    process.env.TEST_HYPERAPIKEY,
    { 
        timeout: 30000,
        apiVersion: '2022-08-01',
        host: 'beta.hyperswitch.io',
        protocol: 'https'
    }
);

let param = {};

exports.getPaymentParam = async (req, res) => {
    const body = req.body;
    // Set comprehensive CSP headers
    res.setHeader('Content-Security-Policy', 
      "default-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io; " +
      "script-src 'self' 'unsafe-inline' https://*.hyperswitch.io https://beta.hyperswitch.io https://browser.sentry-cdn.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "connect-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io; " +
      "frame-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io;"
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    let data = {
        currency: body.currency,
        email: body.email,
        amount: Number(body.amount) * 100,
        first_name: body.first_name,
        last_name: body.last_name
    }
    res.redirect(303, '/payment_page/'+encodeURIComponent(JSON.stringify(data)))
}

exports.paymentPage = async (req, res) => {
  try {
    console.log('Payment page request received:', {
      params: req.params,
      headers: req.headers,
      timestamp: new Date().toISOString()
    });

    const data = JSON.parse(decodeURIComponent(req.params.data));
    console.log('Decoded payment data:', data);
    
    // Generate a random nonce for CSP
    const nonce = require('crypto').randomBytes(16).toString('base64');
    console.log('Generated nonce:', nonce);
    
    // Set CSP headers with nonce
    const cspHeader = `default-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io; ` +
      `script-src 'self' 'unsafe-inline' 'nonce-${nonce}' https://*.hyperswitch.io https://beta.hyperswitch.io https://browser.sentry-cdn.com; ` +
      `style-src 'self' 'unsafe-inline'; ` +
      `connect-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io; ` +
      `frame-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io;`;
    
    console.log('Setting CSP header:', cspHeader);
    res.setHeader('Content-Security-Policy', cspHeader);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Add cache control headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    console.log('Rendering payment page with data:', {
      ...data,
      nonce,
      timestamp: new Date().toISOString()
    });
    
    // Pass data and nonce to the template
    res.render('payment_page', { ...data, nonce });
  } catch (error) {
    console.error('Error in payment page render:', error);
    res.status(500).send('Failed to load payment page. Please try again.');
  }
}

exports.paymentIntent = async (req, res) => {
    try {
        console.log('Payment Intent Request:', {
            body: req.body,
            user: req.user,
            token: req.get('Authorization')
        });

        const body = req.body;

        if (!body.amount || !body.currency) {
            return res.status(400).json({
                error: 'Missing required fields: amount and currency are required'
            });
        }

        if (!body.user_id) {
            return res.status(400).json({
                error: 'User ID is required'
            });
        }

        const amount = Number(body.amount);
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                error: 'Invalid amount'
            });
        }

        const metadata = {
            user_id: body.user_id,
            timestamp: new Date().toISOString(),
            source: 'slot_game'
        };

        try {
            console.log('Creating payment intent:', {
                amount,
                currency: body.currency.toLowerCase(),
                metadata
            });

            const paymentIntent = await hyper.paymentIntents.create({
                amount: amount,
                currency: body.currency.toLowerCase(),
                capture_method: 'automatic',
                confirm: false,
                description: 'Slot Game Credits Purchase',
                metadata: metadata,
                payment_method_types: ["card"],
                return_url: `${process.env.BASE_URL}/completion`,
                setup_future_usage: 'off_session',
                statement_descriptor: 'SLOTGAME*CREDITS',
                statement_descriptor_suffix: 'CREDITS',
                retry_if_failed: true,
                webhook_url: `${process.env.BASE_URL}/webhook`,
                webhook_configs: {
                    payment_succeeded: true,
                    payment_failed: true,
                    payment_processing: true,
                    payment_cancelled: true
                },
                mode: 'test',
                test: true
            });

            console.log('Payment Intent Created:', {
                id: paymentIntent.id,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                status: paymentIntent.status,
                metadata: paymentIntent.metadata,
                client_secret: paymentIntent.client_secret ? 'present' : 'missing'
            });

            if (!paymentIntent.client_secret) {
                throw new Error('No client secret returned from Hyperswitch');
            }

            // Set headers
            res.setHeader('Content-Security-Policy', 
              "default-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io; " +
              "script-src 'self' 'unsafe-inline' https://*.hyperswitch.io https://beta.hyperswitch.io https://browser.sentry-cdn.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "connect-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io; " +
              "frame-src 'self' https://*.hyperswitch.io https://beta.hyperswitch.io;"
            );
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            res.json({
                clientSecret: paymentIntent.client_secret,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                id: paymentIntent.id
            });
        } catch (hyperError) {
            console.error('Hyperswitch API Error:', hyperError.response?.data || hyperError);
            throw new Error('Failed to create payment with Hyperswitch');
        }
    } catch (error) {
        console.error('Payment Intent Creation Error:', error);
        console.error('Error details:', error.response?.data || error.message);
        
        res.status(500).json({
            error: 'Failed to create payment intent',
            message: error.message,
            details: error.response?.data || {},
            code: error.code || 'unknown_error'
        });
    }
}
  
exports.completion = (req, res) => {
    res.render("payment_complete");
}

exports.webhook = async (req, res) => {
    try {
        const event = req.body;
        console.log('Received webhook event:', {
            type: event.type,
            id: event.id,
            timestamp: new Date().toISOString()
        });

        const signature = req.headers['hyperswitch-signature'];
        if (!signature) {
            console.warn('Missing webhook signature');
            return res.status(400).send('Missing signature');
        }

        try {
            const verifiedEvent = await hyper.webhooks.constructEvent(
                req.body,
                signature,
                process.env.HYPER_WEBHOOK_SECRET
            );

            console.log('Verified webhook event:', {
                type: verifiedEvent.type,
                payment_id: verifiedEvent.data.object.id,
                status: verifiedEvent.data.object.status
            });

            switch (verifiedEvent.type) {
                case 'payment_intent.succeeded':
                    await handlePaymentSuccess(verifiedEvent.data.object);
                    break;
                case 'payment_intent.processing':
                    await handlePaymentProcessing(verifiedEvent.data.object);
                    break;
                case 'payment_intent.payment_failed':
                    await handlePaymentFailure(verifiedEvent.data.object);
                    break;
                default:
                    console.log('Unhandled event type:', verifiedEvent.type);
            }

            res.json({ received: true });
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return res.status(400).send('Webhook signature verification failed');
        }
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).send('Webhook processing failed');
    }
};

async function handlePaymentSuccess(paymentIntent) {
    console.log('Processing successful payment:', paymentIntent.id);
    try {
        console.log('Payment processed successfully:', paymentIntent.id);
    } catch (error) {
        console.error('Failed to process successful payment:', error);
    }
}

async function handlePaymentProcessing(paymentIntent) {
    console.log('Payment processing:', {
        id: paymentIntent.id,
        status: paymentIntent.status,
        timestamp: new Date().toISOString()
    });
}

async function handlePaymentFailure(paymentIntent) {
    console.error('Payment failed:', {
        id: paymentIntent.id,
        error: paymentIntent.last_payment_error,
        timestamp: new Date().toISOString()
    });
}
