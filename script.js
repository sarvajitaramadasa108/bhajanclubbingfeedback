const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VaZDEG67T8bWHjibTy2u";

const form = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const successModal = document.getElementById("successModal");
const whatsappBtn = document.getElementById("whatsappBtn");

whatsappBtn.href = WHATSAPP_LINK;

const ratings = {
    vocals: 0,
    instrumental: 0,
    lighting: 0,
    ambience: 0,
    devotional: 0,
    overall: 0
};

document.querySelectorAll(".rating-stars").forEach(group => {

    const ratingName = group.dataset.name;
    const stars = group.querySelectorAll(".star");

    stars.forEach(star => {

        star.addEventListener("click", () => {

            const value = Number(star.dataset.value);

            ratings[ratingName] = value;
            document.getElementById(ratingName).value = value;

            stars.forEach(s => {
                if (Number(s.dataset.value) <= value) {
                    s.classList.add("active");
                } else {
                    s.classList.remove("active");
                }
            });

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

    for(const key in ratings){
        if(ratings[key] === 0){
            e.preventDefault();
            alert("Please complete all ratings.");
            return;
        }
    }

    const community = document.querySelector('input[name="community"]:checked');

    if(!community){
        e.preventDefault();
        alert("Please choose community option.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";

    setTimeout(function(){

        form.reset();

        Object.keys(ratings).forEach(key => {
            ratings[key] = 0;
            document.getElementById(key).value = "";
        });

        document.querySelectorAll(".star").forEach(s => {
            s.classList.remove("active");
        });

        successModal.classList.add("show");

        submitBtn.disabled = false;
        submitBtn.innerHTML = "✨ Submit Feedback";

    },1500);

});
