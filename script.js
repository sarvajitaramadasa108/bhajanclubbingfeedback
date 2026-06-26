const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VaZDEG67T8bWHjibTy2u";

const form = document.getElementById("feedbackForm");
const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");
const submitBtn = document.getElementById("submitBtn");
const successModal = document.getElementById("successModal");
const whatsappBtn = document.getElementById("whatsappBtn");

whatsappBtn.href = WHATSAPP_LINK;

let currentRating = 0;

stars.forEach(star => {

    star.addEventListener("click", () => {

        currentRating = Number(star.dataset.value);

        ratingInput.value = currentRating;

        stars.forEach(s => {

            if (Number(s.dataset.value) <= currentRating) {
                s.classList.add("active");
            } else {
                s.classList.remove("active");
            }

        });

    });

});

form.addEventListener("submit", function(e){

    const mobile = document.getElementById("mobile").value.trim();

    if(!/^[6-9]\d{9}$/.test(mobile)){
        e.preventDefault();
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    if(currentRating===0){
        e.preventDefault();
        alert("Please rate your experience.");
        return;
    }

    const checked=document.querySelectorAll('input[name="enjoyedMost"]:checked');

    if(checked.length===0){
        e.preventDefault();
        alert("Please select at least one option.");
        return;
    }

    const community=document.querySelector('input[name="community"]:checked');

    if(!community){
        e.preventDefault();
        alert("Please choose an option.");
        return;
    }

    submitBtn.disabled=true;
    submitBtn.innerHTML="Submitting...";

    setTimeout(function(){

        form.reset();

        currentRating=0;

        ratingInput.value="";

        stars.forEach(s=>s.classList.remove("active"));

        successModal.classList.add("show");

        submitBtn.disabled=false;
        submitBtn.innerHTML="✨ Submit Feedback";

    },1500);

});