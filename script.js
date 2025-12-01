function toggleMenu(evt) {
    //Toggle navigation menu visibility
    const nav = document.querySelector("#nav-list");
    
    if (!nav) return; 
    nav.classList.toggle('open');

    if (nav.style.display === "block") {
        evt.target.innerText = "=";
        nav.style.display = "none";
        nav.style.transition = "opacity 0.1s ease-out";
        nav.style.opacity = 0;
    } else {
        evt.target.innerText = "x";
        nav.style.display = "block";
        nav.style.transition = "opacity 0.1s ease-in";
        nav.style.opacity = 1;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            //prevent default for submision
            event.preventDefault();

            //collect form data
            const firstName = document.querySelector("#fname").value;
            const lastName = document.querySelector("#lname").value;
            const email = document.querySelector("#email").value;
            const message = document.querySelector("#message").value;
            const phone = document.querySelector("#phone").value;
            const errorMsg = document.querySelector(".error");
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            //validate required fields
            if (firstName === "" && lastName === "" && email === "") {
                errorMsg.innerText = "Please enter required fields.";
                return;
            }

            //validate email format
            if (!emailRegex.test(email)) {
                errorMsg.innerText = "Please enter a valid email address.";
                return;
            }

            //Submit Form
            errorMsg.innerText = "";

            //Build the mailto link
            const subject = encodeURIComponent(`Contact Form Submission from ${firstName} ${lastName}`);
            const body = encodeURIComponent(
                `Name: ${firstName} ${lastName} \r\n` +
                `Email: ${email} \r\n` +
                `Phone: ${phone} \r\n` +
                `Message:${message}`
            );
            const recipient = 'rammontes3@gmail.com';
            const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

            //error handling for mailto
            try { 
            //Open the mailto link
            window.location.href = mailtoLink;
            } catch (error) {
                //fallback in case mailto fails
                window.open(mailtoLink, '_blank');
                errorMsg.innerText = "Could not open email client. Please send email manually.";
            }

            //reset form
            contactForm.reset();

        });
    }
});