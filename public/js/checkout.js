let elements;
let emailAddress;
let paymentElement;
let form;
let processingTimeout;

// Initialize payment form when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Load HyperLoader
  (function() {
    console.log('Page loading started: Initializing HyperLoader script');
    window.hyperswitchDebug = {
      scriptLoadStart: Date.now(),
      logs: []
    };
    window.hyperswitchDebug.logs.push('Page load started at: ' + new Date().toISOString());

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://beta.hyperswitch.io/v1/HyperLoader.js'; // Updated URL based on guide
    script.async = true;
    script.nonce = '<%= nonce %>';

    script.addEventListener('load', async function() {
      window.hyperswitchDebug.logs.push('HyperLoader script successfully loaded at: ' + new Date().toISOString());
      console.log('HyperLoader script successfully loaded');

      try {
// Check if HyperLoader is available
if (typeof window.HyperLoader !== 'function') {
  console.warn('HyperLoader is not available, attempting fallback. Current window object:', window);
  // Attempt a fallback or alternative method if available
  // This is a placeholder for any alternative method provided by Hyperswitch
  throw new Error('HyperLoader is not available');
} else {
  console.log('HyperLoader is available.');
}

// Initialize Hyper with config
const hyperConfig = {
  apiVersion: '2022-08-01',
  mode: 'test' // Ensure test mode is set
};

if (!process.env.HYPER_PUBLISHABLE_KEY) {
  console.error('HYPER_PUBLISHABLE_KEY is not set. Please check your environment variables.');
  throw new Error('HYPER_PUBLISHABLE_KEY is not set');
}

window.Hyper = window.HyperLoader("<%= process.env.HYPER_PUBLISHABLE_KEY %>", hyperConfig);
window.hyperswitchDebug.logs.push('Hyper successfully initialized at: ' + new Date().toISOString());
console.log('Hyper successfully initialized');

        // Load checkout.js after successful initialization
        if (typeof window.onHyperReady === 'function') {
          window.onHyperReady();
        }

        // Initialize payment form
        await initialize();
        await checkStatus();
      } catch (error) {
        console.error('Failed to initialize Hyper. Error details:', error);
        window.hyperswitchDebug.logs.push('Hyper initialization failed at: ' + new Date().toISOString() + ' with error: ' + error.message);
        const messageEl = document.getElementById('payment-message');
        if (messageEl) {
          messageEl.classList.remove('hidden');
          messageEl.textContent = 'Failed to initialize payment system. Please refresh the page.';
        }
      }
    });

    script.addEventListener('error', function(error) {
      window.hyperswitchDebug.logs.push('HyperLoader script failed to load at: ' + new Date().toISOString());
      console.error('HyperLoader script failed to load. Retrying...');
      console.error('Network error details:', error);
      console.error('Please check the script URL and ensure there are no network restrictions or CORS issues.');
      setTimeout(() => {
        document.head.appendChild(script.cloneNode(true)); // Retry loading the script
      }, 3000); // Retry after 3 seconds
      const messageEl = document.getElementById('payment-message');
      if (messageEl) {
        messageEl.classList.remove('hidden');
        messageEl.textContent = 'Failed to load payment system. Retrying...';
      }
    });

    // Add script to document
    window.hyperswitchDebug.logs.push('Adding HyperLoader script at: ' + new Date().toISOString());
    document.head.appendChild(script);

    // Initialize Hyper object after script is loaded
    script.addEventListener('load', function() {
      window.Hyper = window.Hyper || {};
      window.hyperswitchDebug.logs.push('Hyper object initialized at: ' + new Date().toISOString());
    });
  })();
    try {
        console.log('DOM ready, checking Hyper...');
        
        // Check if Hyper is available
        if (!window.Hyper) {
            console.error('Hyper not found after script load. Debugging information:', window.hyperswitchDebug.logs);
            throw new Error('Hyper not found. Please refresh the page.');
        } else {
            console.log('Hyper successfully found and initialized.');
        }

        console.log('Hyper found:', {
            version: window.Hyper.version,
            hasElements: !!window.Hyper.elements
        });
        
        // Get DOM elements
        form = document.querySelector("#payment-form");
        emailAddress = document.getElementById("email");
        
        if (!form || !emailAddress) {
            throw new Error('Required elements not found');
        }

        // Add form submit handler
        form.addEventListener("submit", handleSubmit);

        // Initialize payment
        await initialize();
        await checkStatus();

    } catch (error) {
        console.error('Initialization error occurred. Error details:', error);
        showMessage(error.message || 'Failed to initialize payment system', false);
    }
});

async function initialize() {
  console.log('Starting payment initialization...');
  
  if (!window.Hyper || !window.Hyper.elements) {
    console.error('Hyper not properly initialized');
    showMessage("Payment system not ready. Please refresh the page.", false);
    return;
  }

  try {
    setLoading(true);
    const token = getCookie('auth');
    if (!token) {
        throw new Error('Authentication token not found');
    }

    console.log('Creating payment intent...');
    const response = await fetch("/call_payment_intent", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: document.getElementById("amount").value,
        currency: document.getElementById("currency").value,
        user_id: localStorage.getItem('user_id')
      }),
    });

    if (response.status === 401) {
      throw new Error('Authentication failed. Please login again.');
    }
    
    const responseData = await response.json();
    console.log("Payment Intent Response:", responseData);
    
    if (!response.ok) {
      throw new Error(responseData.message || responseData.error || 'Failed to create payment intent');
    }
    
    const { clientSecret } = responseData;
    if (!clientSecret) {
      throw new Error('No client secret returned from server');
    }

    const appearance = {
      theme: "midnight",
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#1A1F36',
        colorText: '#ffffff',
        colorDanger: '#ff0000',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '4px'
      }
    };

    document.body.style.background = "#1A1F36";
    console.log('Creating elements with appearance:', appearance);
    
    elements = window.Hyper.elements({ 
        appearance, 
        clientSecret,
        mode: 'test'
    });

    const paymentElementOptions = {
      layout: "tabs",
      paymentMethodOrder: ["card"],
      defaultValues: {
        billingDetails: {
          email: document.getElementById("email").value
        }
      }
    };

    try {
      console.log('Creating payment element...');
      paymentElement = elements.create("payment", paymentElementOptions);
      
      // Mount payment element and wait for it to be ready
      const mountPromise = new Promise((resolve, reject) => {
          let mounted = false;
          
          paymentElement.on('ready', () => {
              console.log('Payment Element Ready');
              mounted = true;
              resolve();
          });
          
          paymentElement.on('change', (event) => {
              console.log('Payment Element Change:', event);
              if (event.error) {
                  showMessage(event.error.message, false);
              }
          });

          paymentElement.on('loaderror', (error) => {
              console.error('Payment Element Load Error:', error);
              reject(new Error('Failed to load payment element: ' + error.message));
          });

          setTimeout(() => {
              if (!mounted) {
                  reject(new Error('Payment element mount timeout'));
              }
          }, 10000);
      }).catch(error => {
          console.error('Mount promise error:', error);
          showMessage('Failed to mount payment element', false);
      });

      console.log('Mounting payment element...');
      await paymentElement.mount("#payment-element");
      await mountPromise;
      console.log('Payment element initialization complete');
    } catch (error) {
      console.error('Payment Element Error:', error);
      throw new Error('Failed to initialize payment form: ' + error.message);
    }
  } catch (error) {
    console.error("Initialization error occurred during payment initialization. Error details:", error);
    showMessage("Failed to initialize payment form", false);
  } finally {
    setLoading(false);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  
  if (!window.Hyper) {
    console.error('Hyper not initialized');
    showMessage("Payment system not ready. Please refresh the page.", false);
    return;
  }

  try {
    console.log('Confirming payment...');
    const { error, status } = await window.Hyper.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
        receipt_email: emailAddress.value,
      },
      redirect: "always",
    });

    if (error) {
      console.error('Payment confirmation error:', error);
      if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message, false);
      } else {
        showMessage("An unexpected error occurred.", false);
      }
      return;
    }

    console.log("Payment status:", status);
    if (status) {
      handlePaymentStatus(status);
    }
  } catch (error) {
    console.error("Submit error occurred during payment submission. Error details:", error);
    showMessage("Failed to process payment", false);
  } finally {
    setLoading(false);
  }
}

async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  if (!window.Hyper) {
    console.error('Hyper not initialized');
    showMessage("Payment system not ready. Please refresh the page.", false);
    return;
  }

  try {
    console.log('Retrieving payment intent...');
    const { paymentIntent } = await window.Hyper.retrievePaymentIntent(clientSecret);
    console.log("Payment Intent:", paymentIntent);

    switch (paymentIntent.status) {
      case "succeeded":
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
          showMessage("User ID not found", false);
          return;
        }

        try {
          const token = getCookie('auth');
          if (!token) {
            throw new Error('Authentication required');
          }

          const response = await fetch("/register_transaction", {
            method: "post",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              user_id,
              paymentIntent
            })
          });

          if (response.status === 401) {
            throw new Error('Authentication failed. Please login again.');
          }

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Transaction registration failed');
          }

          const result = await response.json();
          console.log("Transaction result:", result);

          if (result.status === 200) {
            showMessage(result.message);
          } else if (result.status === 400) {
            showMessage(result.message, false);
            console.warn("Transaction warning:", result.message);
          } else {
            throw new Error('Unexpected response status');
          }
        } catch (error) {
          console.error("Transaction error:", error);
          showMessage("Failed to register transaction", false);
        }
        break;

      case "processing":
        showMessage("Your payment is processing.", false);
        // Set up a timeout to check status again
        if (processingTimeout) clearTimeout(processingTimeout);
        processingTimeout = setTimeout(checkStatus, 5000);
        break;

      case "requires_payment_method":
        showMessage("Your payment was not successful, please try again.", false);
        break;

      default:
        console.warn("Unexpected payment status:", paymentIntent.status);
        showMessage("Something went wrong.", false);
        break;
    }
  } catch (error) {
    console.error("Status check error occurred during payment status check. Error details:", error);
    showMessage("Failed to check payment status", false);
  }
}

function showMessage(messageText, redirect = true) {
  const messageContainer = document.querySelector("#payment-message");
  if (!messageContainer) {
    console.error('Message container not found');
    return;
  }
  
  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  if (redirect) {
    setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageContainer.textContent = "";
      window.location.replace("/home");
    }, 8000);
  }
}

function setLoading(isLoading) {
  const submitButton = document.querySelector("#submit");
  const spinner = document.querySelector("#spinner");
  const buttonText = document.querySelector("#button-text");
  
  if (!submitButton || !spinner || !buttonText) {
    console.error('Loading elements not found');
    return;
  }

  if (isLoading) {
    submitButton.disabled = true;
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
  } else {
    submitButton.disabled = false;
    spinner.classList.add("hidden");
    buttonText.classList.remove("hidden");
  }
}

// Cleanup on page unload
window.addEventListener('unload', () => {
  if (processingTimeout) {
    clearTimeout(processingTimeout);
  }
});

// Add debug keyboard shortcut
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') {
    const debugInfo = document.getElementById('debug-info');
    const debugLogs = document.getElementById('debug-logs');
    debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
    if (debugInfo.style.display === 'block') {
      debugLogs.textContent = JSON.stringify(window.hyperswitchDebug.logs, null, 2);
    }
  }
});

// Load HyperLoader
(function() {
  console.log('Page loading started');
  window.hyperswitchDebug = {
    scriptLoadStart: Date.now(),
    logs: []
  };
  window.hyperswitchDebug.logs.push('Page load started at: ' + new Date().toISOString());

  // Create script element
  const script = document.createElement('script');
  script.src = 'https://sandbox.hyperswitch.io/v1/HyperLoader.js'; // Updated URL based on guide
  script.async = true;
  script.nonce = '<%= nonce %>';

  script.addEventListener('load', function() {
    window.hyperswitchDebug.logs.push('HyperLoader script loaded at: ' + new Date().toISOString());

    try {
      // Check if HyperLoader is available
      if (typeof window.HyperLoader !== 'function') {
        console.warn('HyperLoader is not available, attempting fallback');
        // Attempt a fallback or alternative method if available
        // This is a placeholder for any alternative method provided by Hyperswitch
        throw new Error('HyperLoader is not available');
      }

      // Initialize Hyper with config
      const hyperConfig = {
        apiVersion: '2022-08-01',
        mode: 'test' // Ensure test mode is set
      };

      window.Hyper = window.HyperLoader("<%= process.env.HYPER_PUBLISHABLE_KEY %>", hyperConfig);
      window.hyperswitchDebug.logs.push('Hyper initialized at: ' + new Date().toISOString());

      // Load checkout.js after successful initialization
      if (typeof window.onHyperReady === 'function') {
        window.onHyperReady();
      }
    } catch (error) {
      console.error('Failed to initialize Hyper:', error);
      window.hyperswitchDebug.logs.push('Hyper initialization failed at: ' + new Date().toISOString() + ' with error: ' + error.message);
      const messageEl = document.getElementById('payment-message');
      if (messageEl) {
        messageEl.classList.remove('hidden');
        messageEl.textContent = 'Failed to initialize payment system. Please refresh the page.';
      }
    }
  });

  script.addEventListener('error', function(error) {
    window.hyperswitchDebug.logs.push('HyperLoader script failed to load at: ' + new Date().toISOString());
    const messageEl = document.getElementById('payment-message');
    if (messageEl) {
      messageEl.classList.remove('hidden');
      messageEl.textContent = 'Failed to load payment system. Please refresh the page.';
    }
  });

  // Add script to document
  window.hyperswitchDebug.logs.push('Adding HyperLoader script at: ' + new Date().toISOString());
  document.head.appendChild(script);

  // Initialize Hyper object after script is loaded
  script.addEventListener('load', function() {
    window.Hyper = window.Hyper || {};
    window.hyperswitchDebug.logs.push('Hyper object initialized at: ' + new Date().toISOString());
  });
})();
