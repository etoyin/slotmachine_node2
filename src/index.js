import barba from '@barba/core';
import gsap from 'gsap';


const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

document.addEventListener('DOMContentLoaded', function () {

    const container = document.querySelector('.barba-container');
    if(container){
        console.log("container element is:", container);
     } else{
       console.log("barba container element not found")
     }
    barba.init({
        transitions: [{
            name: 'default-transition',
            async leave(data){
                const done = this.async()
                await gsap.to(data.current.container, {
                opacity: 0,
                duration: 1,
                onComplete: done
            })

            },
            async enter(data){
                const done = this.async()
                await gsap.from(data.next.container, {
                opacity: 0,
                duration: 1,
                onComplete: done
            })
            },
        }]
    });

    // console.log("klkl");
    const submit = document.getElementById('submit');
    //check to see if this element exist
        submit.addEventListener('click', async function(event) {
            event.preventDefault();
            this.text = "Loading...";
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
                        barba.go('/home');
                    }
                    else{
                        //window.location.replace("/");
                        console.error("Regsitration failed!")
                        this.text = "Get free spins";
                    }
                    this.text = "Get free spins";
                    console.log(response);
                    // $(this).text("Get your free spins");

                    
                } catch (error){
                    console.error("Network Error:", error);
                    this.text = "Get free spins";
                }
            }
            else{
                alert("Invalid email address!")
            }
            
        });
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