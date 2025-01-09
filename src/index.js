import Swup from 'swup';

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
        // console.log("content replaced:", event.to.html);
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
                        swup.navigate('/home');
                    }
                    else{
                        swup.navigate('/mobile');
                    }
                }
                else{
                    //window.location.replace("/");
                    console.error("Regsitration failed!")
                    submit.value = "Get free spins";
                }
                submit.value = "Get free spins";
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

    // var a = document.getElementById('yourlinkId'); //or grab it by tagname etc
    // a.href = "somelink url"

    /*$("#submit").click(function(){
        let email = $("#email").val();
        $(this).text("Loading...")

        if(validateEmail(email)){

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
                })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.success){
                    localStorage.setItem('user_id', JSON.stringify(data.results.insertId));
                    //window.location.replace("/home");
                    barba.go('/home'); 
                }
                else{
                    //window.location.replace("/");
                }
                console.log(data);
                //  $(this).text("Get your free spins");
                
            })
            .catch(error => {
                console.error('Error:', error);
                $(this).text("Get your free spins");
            });
            
            // $.post("/register", {
            //     body: JSON.stringify(email)
            // }, function(result){
            //     console.log(result);
            // });
        }
        else{
            alert("Incorrect email!");
            $(this).text("Get your free spins");
        }
    })*/
});