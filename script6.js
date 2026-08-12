console.log("SCRIPT 6 IS WORKING!");


/* =========================================
   ITINERARY DATA
   ========================================= */

const itinerary = {
    afternoon: null,
    food: null,
    night: null
};


/* =========================================
   SCREEN FUNCTION
   ========================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenId);

    if (nextScreen) {
        nextScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   START PLANNING
   ========================================= */

const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function() {

    showScreen("afternoon-screen");

});


/* =========================================
   AFTERNOON OPTIONS
   ========================================= */

const afternoonCards =
    document.querySelectorAll(
        "#afternoon-screen .option-card"
    );

const afternoonContinue =
    document.getElementById("afternoon-continue");


afternoonCards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Remove previous selection
        afternoonCards.forEach(function(otherCard) {
            otherCard.classList.remove("selected");
        });

        // Select this card
        card.classList.add("selected");


        // Surprise option
        if (card.dataset.surprise === "true") {

            const choices = [
                "Smithsonian National Museum of Natural History",
                "Georgetown Waterfront",
                "National Mall"
            ];

            const randomIndex =
                Math.floor(Math.random() * choices.length);

            itinerary.afternoon =
                choices[randomIndex];

        }

        // Normal option
        else {

            itinerary.afternoon =
                card.dataset.value;

        }


        // Enable Continue
        afternoonContinue.disabled = false;

    });

});


/* =========================================
   AFTERNOON → FOOD
   ========================================= */

afternoonContinue.addEventListener("click", function() {

    showScreen("food-screen");

});


/* =========================================
   FOOD OPTIONS
   ========================================= */

const foodCards =
    document.querySelectorAll(
        "#food-screen .option-card"
    );

const foodContinue =
    document.getElementById("food-continue");


foodCards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Remove previous selection
        foodCards.forEach(function(otherCard) {
            otherCard.classList.remove("selected");
        });

        // Select this card
        card.classList.add("selected");


        // Surprise option
        if (card.dataset.surprise === "true") {

            const choices = [
                "Asian",
                "Mexican",
                "Italian"
            ];

            const randomIndex =
                Math.floor(Math.random() * choices.length);

            itinerary.food =
                choices[randomIndex];

        }

        // Normal option
        else {

            itinerary.food =
                card.dataset.value;

        }


        // Enable Continue
        foodContinue.disabled = false;

    });

});


/* =========================================
   FOOD → NIGHT
   ========================================= */

foodContinue.addEventListener("click", function() {

    showScreen("night-screen");

});


/* =========================================
   NIGHT OPTIONS
   ========================================= */

const nightCards =
    document.querySelectorAll(
        "#night-screen .option-card"
    );

const nightContinue =
    document.getElementById("night-continue");


nightCards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Remove previous selection
        nightCards.forEach(function(otherCard) {
            otherCard.classList.remove("selected");
        });

        // Select this card
        card.classList.add("selected");


        // Surprise option
        if (card.dataset.surprise === "true") {

            const choices = [
                "Movie Night",
                "Dessert of Your Choice",
                "Night Walk at The Yards Park"
            ];

            const randomIndex =
                Math.floor(Math.random() * choices.length);

            itinerary.night =
                choices[randomIndex];

        }

        // Normal option
        else {

            itinerary.night =
                card.dataset.value;

        }


        // Enable Continue
        nightContinue.disabled = false;

    });

});


/* =========================================
   BUILD FINAL ITINERARY
   ========================================= */

nightContinue.addEventListener("click", function() {

    document.getElementById("final-afternoon").textContent =
        itinerary.afternoon;

    document.getElementById("final-food").textContent =
        itinerary.food;

    document.getElementById("final-night").textContent =
        itinerary.night;

    showScreen("itinerary-screen");

});


/* =========================================
   FINAL CONFIRMATION
   ========================================= */

const confirmButton =
    document.getElementById("confirm-button");


confirmButton.addEventListener("click", function() {

    alert(
        "Your September 19th anniversary itinerary is confirmed! ❤️"
    );

});