//===============================================================================//
//CREATING THE OBJECT ARRaYFOR THE MINI CHALLENGE
//===============================================================================//
const questions = [
    {
        question: "what ingredient is commonly used to sweeten cookies?",
        options: ["Salt", "Sugar", "Baking Powder", "Water"],
        correctAnswer: "Sugar",
        image: "assets/images/CookieImages/sugar-cookie.png",
        ingredient: "Sugar",
        multiplier: 1.2
    },
    {
        question: "what holds the cookie dough together",
        options: ["flour", "salt", "baking soda", "Chocolate Chips"],
        correctAnswer: "flour",
        image: "assets/images/CookieImages/red velvet cake cookie made with flour.png",
        multiplier: 1.4
    },
    {
        question: "Which ingredient is often added to make cookies extra fudgy?",
        options: ["Fudge", "Butter", "Flour", "Sugar"],
        correctAnswer: "Fudge",
        image: "assets/images/CookieImages/fudgecookie.png",
        ingredient: "Fudge",
        multiplier: 1.2
     },
     {
        question: "What is a popular ingredient in cookies that adds a crunchy texture?",
        options: ["Chocolate Chips", "Nuts", "Sprinkles", "Fudge"],
        correctAnswer: "Nuts",
        image: "assets/images/CookieImages/Peanutcookie.png",
        ingredient: "Nuts",
        multiplier: 1.6
    },
    {
        question: "Which ingredient is used to add colorful decoration to cookies?",
        options: ["Sprinkles", "Salt", "Butter", "Oatmeal Raisin"],
        correctAnswer: "Sprinkles",
        image: "assets/images/CookieImages/sprinklecookie.png",
        ingredient: "Sprinkles",
        multiplier: 1.1
    },
    {
        question: "What ingredient is often added to cookies for a classic chocolate flavor?",
        options: ["Oatmeal Raisin", "Chocolate Chips", "White Chocolate Chips", "Sprinkles"],
        correctAnswer: "Chocolate Chips",
        image: "assets/images/CookieImages/chocchip.png",
        ingredient: "Chocolate Chips",
        multiplier: 1.4
    },
    {
        question: "Which ingredient adds a chewy texture and is often paired with cinnamon?",
        options: ["Nuts", "Oatmeal Raisin", "Fudge", "Chocolate Chips"],
        correctAnswer: "Oatmeal Raisin",
        image: "assets/images/CookieImages/oatmealraison.png",
        ingredient: "Oatmeal Raisin",
        multiplier: 1.5
    },
    {
        question: "What ingredient gives cookies a creamy, sweet chocolate flavor?",
        options: ["Butter", "White Chocolate Chips", "Fudge", "Oatmeal Raisin"],
        correctAnswer: "White Chocolate Chips",
        image: "assets/images/CookieImages/whitechocchip.png",
        ingredient: "White Chocolate Chips",
        multiplier: 1.5
    },
    {
        question: "Which ingredient is known for adding a fun, colorful crunch to cookies?",
        options: ["Nuts", "M&M's", "Oatmeal Raisin", "White Chocolate Chips"],
        correctAnswer: "M&M's",
        newCookieImage: "assets/images/CookieImages/mandmcookie.png",
        ingredient: "M&M's",
        multiplier: 1.5
    }
];
//===============================================================================================//
//VARIABLES
//===============================================================================================//
let counter = 0; // this is the variable we are using to store the amount of times the cookie is clicked i.e. the cookier count
let milestoneCounter =50;

const counterDisplay = document.getElementById("cookieCount"); // this is where in the html we will display the cookier count
const milestoneDisplay = document.getElementById("clicksNext")
const cookieImage = document.getElementById("cookie"); // this is the location in the html that we will listening for a click

const miniChallenge = document.getElementById("challengePopup");
const challengeQuestion = document.getElementById("challengeQuestion");
const answerButtons = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4")
];

let currentQuestion = null;


//=========================================================================================================//
// COOKIE CLICK FUNCTION TO INCREMENT COUNT AND DECREASE MILESTONE COUNTER
// ========================================================================================================//

function handleClick() {  // function named "handleClick" that we will use to add 1 to every time the cookie images is clicked
    counter++; // Telling the computer to Increase the value in the counter variable by 1 everytime this function is called
    milestoneCounter--;
    counterDisplay.innerText = counter; // then telling the computer to display in the counterdisplay.innertext the value this ther counter variable.
    milestoneDisplay.innerText = milestoneCounter;

    if (milestoneCounter === 0) {
       showChallengePopup();
        }
    }

function showChallengePopup() {

        miniChallenge.classList.remove("hidden");
        miniChallenge.style.display = "block";

        currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        challengeQuestion.innerText = currentQuestion.question;

        currentQuestion.options.forEach((option, index) => {
        answerButtons[index].innerText = option;
   });
}

function showFeedbackMessage(isCorrect) {
    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackText = document.getElementById("feedbackText");

    if (isCorrect) {
        feedbackText.textContent = "CORRECT!";
        feedbackMessage.style.backgroundColor = "#f1f508"; // Green for correct
    } else {
        feedbackText.textContent = "TRY AGAIN!";
        feedbackMessage.style.backgroundColor = "#dc3545"; // Red for incorrect
    }

    // Show feedback message
    feedbackMessage.style.display = "inline-block";

    // Hide feedback message after 2 seconds
    setTimeout(() => {
        feedbackMessage.style.display = "none";
    }, 2000);
}
let clickMultiplier = 1;  // Start with a base multiplier
const ingredientsListDisplay = document.getElementById("ingredientsList");  // Where acquired ingredients are displayed


function checkAnswer(selectedAnswer) {
    miniChallenge.classList.add("hidden");  // Hide popup

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    showFeedbackMessage(isCorrect); // Show feedback message based on answer

    if (isCorrect) {
        cookieImage.src = currentQuestion.image;  // Update cookie image if answer is correct
    }

// Hide the ingredient from the store
const ingredientId = currentQuestion.ingredient.toLowerCase();
document.getElementById(ingredientId).style.display = "none";

// Update the click multiplier
clickMultiplier *= currentQuestion.multiplier;

        // Add the ingredient to the acquired ingredients list
        addIngredientToTable(currentQuestion.ingredient, currentQuestion.multiplier);
    }
    // Reset milestone counter for the next question
    milestoneCounter = 50;  // Reset milestone counter for next level

// Function to add the acquired ingredient to the ingredients list table
function addIngredientToTable(ingredient, multiplier) {
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient}: x${multiplier.toFixed(1)} multiplier`;
    ingredientsListDisplay.appendChild(listItem);
}


// Set up event listeners for each answer button
answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => checkAnswer(button.innerText));
});

// Event listener for main cookie image click
cookieImage.addEventListener("click", handleClick);


//====================================//
//2nd Logic -Timer //
//====================================//

let countDownTimer = 300
const timerDisplay = document.getElementById("time");
let setIntervalID;

function startTimer() {
    updateTimer()
    setIntervalID = setInterval(updateTimer, 1000);
}
function updateTimer() {
    if(countDownTimer <= 0) {
        clearInterval(setIntervalID);
        timerDisplay.innerText = "Game Over - Better Luck Next Time";
    } else {
        const minutes = Math.floor(countDownTimer / 60);
        let seconds = countDownTimer % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        timerDisplay.innerText = minutes + ":" + seconds;
        countDownTimer--;
    }
}
cookieImage.addEventListener("click", startTimer, { once: true });

