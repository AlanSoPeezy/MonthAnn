// ==========================================
// SIX-MONTH ANNIVERSARY WEBSITE
// ==========================================


// ==========================================
// EMAILJS SETTINGS
// ==========================================

const EMAILJS_PUBLIC_KEY = "lP2eWNxMg75wwiWUm";
const EMAILJS_SERVICE_ID = "service_it9zuv6";
const EMAILJS_TEMPLATE_ID = "template_15su1w5";


// Initialize EmailJS
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});


// ==========================================
// STORE HER SELECTIONS
// ==========================================

const selections = {
    afternoon: "",
    food: "",
    night: ""
};


// ==========================================
// SCREEN NAVIGATION
// ==========================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// START PLANNING
// ==========================================

const startButton = document.getElementById("start-button");

if (startButton) {

    startButton.addEventListener("click", function () {

        showScreen("afternoon-screen");

    });

}


// ==========================================
// HANDLE OPTION SELECTIONS
// ==========================================

const optionCards = document.querySelectorAll(".option-card");

optionCards.forEach(card => {

    card.addEventListener("click", function () {

        const category = this.dataset.category;

        // Remove previous selection
        document
            .querySelectorAll(`.option-card[data-category="${category}"]`)
            .forEach(option => {
                option.classList.remove("selected");
            });


        // Select this card
        this.classList.add("selected");


        // ======================================
        // NORMAL OPTION
        // ======================================

        if (this.dataset.surprise !== "true") {

            selections[category] = this.dataset.value;

        }


        // ======================================
        // SURPRISE ME
        // ======================================

        else {

            const availableOptions = Array.from(
                document.querySelectorAll(
                    `.option-card[data-category="${category}"]:not(.surprise-card)`
                )
            );

            const randomOption =
                availableOptions[
                    Math.floor(Math.random() * availableOptions.length)
                ];


            selections[category] = randomOption.dataset.value;


            // Briefly highlight the randomly selected option
            availableOptions.forEach(option => {
                option.classList.remove("surprise-selected");
            });

            randomOption.classList.add("surprise-selected");

        }


        // Enable the appropriate Continue button
        updateContinueButton(category);

    });

});


// ==========================================
// ENABLE / DISABLE CONTINUE BUTTONS
// ==========================================

function updateContinueButton(category) {

    let buttonId;

    if (category === "afternoon") {
        buttonId = "afternoon-continue";
    }

    if (category === "food") {
        buttonId = "food-continue";
    }

    if (category === "night") {
        buttonId = "night-continue";
    }


    const button = document.getElementById(buttonId);

    if (!button) {
        return;
    }


    if (selections[category] !== "") {

        button.disabled = false;

    } else {

        button.disabled = true;

    }

}


// ==========================================
// AFTERNOON → FOOD
// ==========================================

const afternoonContinue =
    document.getElementById("afternoon-continue");

if (afternoonContinue) {

    afternoonContinue.addEventListener("click", function () {

        if (selections.afternoon === "") {
            return;
        }

        showScreen("food-screen");

    });

}


// ==========================================
// FOOD → NIGHT
// ==========================================

const foodContinue =
    document.getElementById("food-continue");

if (foodContinue) {

    foodContinue.addEventListener("click", function () {

        if (selections.food === "") {
            return;
        }

        showScreen("night-screen");

    });

}


// ==========================================
// NIGHT → FINAL ITINERARY
// ==========================================

const nightContinue =
    document.getElementById("night-continue");

if (nightContinue) {

    nightContinue.addEventListener("click", function () {

        if (selections.night === "") {
            return;
        }


        // Put selections into final itinerary

        document.getElementById("final-afternoon").textContent =
            selections.afternoon;

        document.getElementById("final-food").textContent =
            selections.food;

        document.getElementById("final-night").textContent =
            selections.night;


        // Show final page

        showScreen("itinerary-screen");

    });

}


// ==========================================
// SEND EMAIL
// ==========================================

const confirmButton =
    document.getElementById("confirm-button");


if (confirmButton) {

    confirmButton.addEventListener("click", function () {

        // Prevent double-clicking
        confirmButton.disabled = true;

        confirmButton.textContent = "Sending... ❤️";


        // ======================================
        // EMAIL DATA
        // ======================================

        const templateParams = {

            afternoon: selections.afternoon,

            food: selections.food,

            night: selections.night

        };


        // ======================================
        // SEND THROUGH EMAILJS
        // ======================================

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        )

        .then(function(response) {

            console.log(
                "Email successfully sent!",
                response.status,
                response.text
            );


            // Change button
            confirmButton.textContent =
                "It's a Date! ❤️";


            // Small delay before confirmation
            setTimeout(function() {

                showConfirmation();

            }, 700);


        })

        .catch(function(error) {

            console.error(
                "Email failed:",
                error
            );


            confirmButton.disabled = false;

            confirmButton.textContent =
                "Try Again ❤️";


            alert(
                "Something went wrong sending the itinerary. Please try again!"
            );

        });

    });

}


// ==========================================
// FINAL CONFIRMATION
// ==========================================

function showConfirmation() {

    const container =
        document.querySelector("#itinerary-screen .container");


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="emoji-decoration">
            🩵 💕 🩵
        </div>

        <div class="step">
            SEPTEMBER 19, 2026
        </div>

        <h1>
            It's a Date. ❤️
        </h1>

        <p class="subtitle">
            Our six-month anniversary is officially planned.
        </p>


        <div class="final-message">

            <p>
                ☀️ ${selections.afternoon}
            </p>

            <p>
                🍴 ${selections.food}
            </p>

            <p>
                🌙 ${selections.night}
            </p>

            <br>

            <p>
                I can't wait to spend the day with you. 🩵
            </p>

        </div>


        <div style="
            font-size: 42px;
            margin-top: 25px;
        ">
            🩵 🌸 🩵
        </div>

    `;

}