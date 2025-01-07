// replace the test publishable key with your hyperswitch publishable key
const hyper = Hyper("pk_snd_c8f1b80338f74dfa99a8c5367694fd2c");//"pk_snd_c8f1b80338f74dfa99a8c5367694fd2c";

const items = [{ product_id: "A113" }];

// background color to match sdk theme
const backgroundColor = (theme) => {
  if (theme === "brutal") return "#ff00c533";
  else if (theme === "midnight") return "#1A1F36";
  else if (theme === "soft") return "#3E3E3E";
  else return "#ddd8d812";
};

let elements;

initialize();
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

var emailAddress = document.getElementById("email");

async function initialize() {
  setLoading(true);
  const response = await fetch("/call_payment_intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: document.getElementById("amount").value,
      currency: document.getElementById("currency").value,
    }),
  });
  const { clientSecret } = await response.json();

  console.log(clientSecret);
  

  const appearance = {
    theme: "midnight", // Theme - default, soft, brutal, midnight, none, charcoal
  };

  document.body.style.background = backgroundColor(appearance.theme);
  elements = hyper.elements({ appearance, clientSecret });

  
  const paymentElementOptions = {
    layout: "tabs",
    // paymentMethodOrder: ["card", "ideal", "sepaDebit", "sofort"],
    wallets: {
      walletReturnUrl: `${window.location.origin}`,
      applePay: "auto",
      googlePay: "auto",
      payPal: "auto",
      klarna: "never",
      style: {
        theme: "dark",
        type: "default",
        height: 55,
        buttonRadius: 4,
      },
    },
  };
  

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
  setLoading(false);
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  
  const { error, status } = await hyper.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/completion`,
      receipt_email: emailAddress,
    },
    redirect: "always",
  });

  if (error && (error.type === "card_error" || error.type === "validation_error")) {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  console.log(status);
  handlePaymentStatus(status);
  setLoading(false);
}

async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  console.log("elements");

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await hyper.retrievePaymentIntent(clientSecret);

  console.log(paymentIntent);
  // pay_mOU1hW9OQ9BzcUCs3GUO
  switch (paymentIntent.status) {
    
    case "succeeded":
      // showMessage("Payment succeeded!");
      let user_id = localStorage.getItem('user_id');
      console.log(user_id);
      
      await fetch("/register_transaction", {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id, paymentIntent
        })
      })
      .then(res => res.json())
      .then(res =>{
        if(res.status == 200 || res.status == 400){
          console.log(res);
          showMessage(res.message);
        }
      })

      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
    window.location.replace("/home")
  }, 4000);
}

function setLoading(isLoading) {
  if (isLoading) {
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}
