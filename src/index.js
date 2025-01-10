import Swup from 'swup';
import $ from 'jquery'
// import barba from '@barba/core';
// import gsap from 'gsap';
// import barbaCss from '@barba/css';

// barba.use(barbaCss);

// document.getElementById('submit').value = "Loading...";

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

async function loadScript(url){
    return new Promise( (resolve) => {
        const script = document.createElement('script')
         script.type = 'text/javascript'
          script.src = url
          script.onload = () => resolve();
          
        //  document.body.appendChild(script);
         document.getElementsByTagName('head')[0].appendChild(script);
    })
}

document.addEventListener('DOMContentLoaded', function () {

    const swup = new Swup({
        containers: ['#swup'],
        animateHistoryBrowsing: true,
        // transitions: [/* Define transitions */],
    });
    // swup.hooks.on('visit:start', () => {
    //     console.log(window.location.href);
    // })

    


    // barba.init({
    //     transitions: [{
    //         name: 'default-transition',
    //         async leave(data){
    //             const done = this.async()
    //             await gsap.to(data.current.container, {
    //                 opacity: 0,
    //                 duration: 0.5,
    //                 onComplete: done
    //             })

    //         },
    //         async enter(data){
    //             const done = this.async()
    //             await gsap.from(data.next.container, {
    //                 opacity: 0,
    //                 duration: 0.5,
    //                 onComplete: done
    //             })
    //         },
    //     }]
    // });

    swup.hooks.on('content:replace', async (event) => {
        // Get the new document
        console.log("content replaced:", event);
        console.log("contentReplaced event fired, url is:", window.location.pathname);
        if(window.location.pathname == "/fund_wallet"){
            let user_id = localStorage.getItem('user_id');
            fetch('/track_fund_page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id
                })
            })
            .then(response => {
                // Handle the response, if necessary
                return response.json();
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error('Error tracking visit:', error);
            });




            fetch('/get_wallet_balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id
                })
            })
            .then(response => {
                // Handle the response, if necessary
                return response.json();
            })
            .then(res => {
                console.log(res);
                $("#balance").text(
                    res.data[0].balance ? res.data[0].balance : 0
                )
            })
            .catch(error => {
                console.error('Error tracking visit:', error);
            });
        }
        if(window.location.pathname == "/credit_card"){
            $(document).ready(function(){
            
                $("#submit_payment").click(function(){
                    let first_name = $("#first_name").val();
                    let last_name = $("#last_name").val();
                    let currency = $("#currency").val();
                    let amount = $("#amount").val();
                    let email = $("#email").val();
    
    
                    console.log(amount, currency);
                    if(currency.length < 1){
                        alert("Select a currency!")
                    }
                    if(!validateEmail(email)){
                        alert("Enter valid email!")
                    }
                    if(amount < 1){
                        alert("Add an amount greater $0.99!")
                    }
    
                    if(currency.length >1 && amount >= 1 && validateEmail(email)){
                        //alert("jkj!");
                        $("form").submit();
                    }
    
                })
    
                let user_id = localStorage.getItem('user_id');
                
                fetch('/track_credit_card_page', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id
                    })
                })
                .then(response => {
                    // Handle the response, if necessary
                    return response.json();
                })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.error('Error tracking visit:', error);
                });
    
    
    
    
                fetch('/get_wallet_balance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id
                    })
                })
                .then(response => {
                    // Handle the response, if necessary
                    return response.json();
                })
                .then(res => {
                    console.log(res);
                    $("#balance").text(
                        res.data[0].balance ? res.data[0].balance : 0
                    )
                })
                .catch(error => {
                    console.error('Error tracking visit:', error);
                });
            })
        }
        const newDoc = new DOMParser().parseFromString(event.to.html, 'text/html');
        const scripts = newDoc.querySelectorAll('script[type="text/javascript"]');
        for(const script of scripts) {
            console.log(script);
            
            if (script.src) {
                await loadScript(script.src);
            }
        };
        console.log(document.body);

    });
    // console.log("klkl");
    const submit = document.getElementById('submit');
    // document.getElementById('submit').textContent = "Loading...";
    //check to see if this element exist
    submit?.addEventListener('click', async function(event) {
        event.preventDefault();
        submit.value = "Loading...";
        const email = document.getElementById("email").value;
        if(validateEmail(email)){
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email
                    }),
                }).then(res => res.json());
                console.log(response);
                if(response.success){
                    localStorage.setItem('user_id', JSON.stringify(response.results.insertId));
                    // window.location.replace("/home");
                    if(window.innerWidth > 600){
                        console.log("Window Width:",window.innerWidth);
                        await swup.navigate('/home');
                    }
                    else{
                        await swup.navigate('/mobile');
                    }
                }
                else{
                    //window.location.replace("/");
                    console.error("Regsitration failed!")
                    submit.value = "Get free spins";
                }
                console.log(response);
                // $(this).text("Get your free spins");

                
            } catch (error){
                console.error("Network Error:", error);
                this.textContent = "Get free spins";
            }
        }
        else{
            alert("Invalid email address!");
        }
        
    });


    // console.log("klklklk");
    
    let back = document.getElementById("back");
    back?.addEventListener("click", async function() {
        console.log("Window Width:",window.innerWidth);
        if(window.innerWidth > 600){
            swup.navigate('/home');
        }
        else{
            swup.navigate('/mobile');
        }
    });

});