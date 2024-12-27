const questions = [
    {
        text: "Do you hate me?",
        options: ["Yes", "No"],
        logic: (answer, buttons) => {
            if (answer === "Yes") {
                const noButton = buttons.find((btn) => btn.textContent === "No");
    
                // Extract the current scale from the transform style
                const currentScale = parseFloat(noButton.style.transform.replace(/[^0-9.]/g, "")) || 1;
                const newScale = currentScale + 0.1; // Smaller increments for smoother progression
                noButton.style.transform = `scale(${newScale})`;
    
                // Gradually change the button color to more intense shades
                const colors = ["#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#ff0000"];
                const currentColorIndex = Math.min(Math.floor(newScale * 2 - 2), colors.length - 1);
                noButton.style.backgroundColor = colors[currentColorIndex];
    
                return false; // Prevents advancing to the next question
            }
            return true; // Allows advancing if "No" is clicked
        }
    },
    {
        text: "Will you always support me, even when I’m being ridiculous?",
        options: ["Yes", "No"],
        logic: (() => {
            const errorMessages = [
                "WRONGGGGGGG",
                "TRYYYY AGAINNNN",
                "I'll FIGHT YOU",
                "THE ANSWER IS YES",
                "YOU THINK YOU ARE FUNNY?",
                "IF YOU HATE ME JUST SAY THAT"
            ];
            let errorIndex = 0;
    
            return (answer) => {
                if (answer === "No") {
                    // Display the next error message in the sequence
                    showPopup(errorMessages[errorIndex]);
    
                    // Increment the index and wrap around when reaching the end of the array
                    errorIndex = (errorIndex + 1) % errorMessages.length;
                    return false; // Prevent advancing
                }
                return true; // Allow advancing if "Yes" is selected
            };
        })()
    },
    {
        text: "Who is Hannah?",
        options: ["She sounds stupid", "My Friend"],
        logic: (answer, buttons) => {
            if (answer === "My Friend") {
                const friendButton = buttons.find((btn) => btn.textContent === "My Friend");
                friendButton.style.display = "none"; // Hides the "My Friend" button
                return false; // Prevents advancing
            }
            return true; // Allows advancing if "She sounds stupid" is selected
        }
    },
    {
        text: "If I were a bug, would you still want to be with me?",
        options: ["Yes", "No"],
        logic: (answer) => {
            if (answer === "No") {
                showPopup("You don’t deserve Bug Me!");
                return false;
            }
            return true;
        }
    },
    {
        text: "Do I have a bigger ass than Hannah?",
        options: ["Yes"],
        logic: () => true // Automatically passes, as there's only one option
    },
    {
        text: "If I became a mermaid, would you learn how to swim for me?",
        options: ["Yes", "No"],
        logic: (answer) => {
            if (answer === "No") {
                showPopup("You’d better start practicing!");
                return false;
            }
            return true;
        }
    },
    {
        text: "Would you fight a bear to save me?",
        options: ["Yes", "No"],
        logic: (answer) => {
            if (answer === "No") {
                showPopup("Guess I’m bear food, then!");
                return false;
            }
            return true;
        }
    },
    {
        text: "Would you still love me if I became a zombie, and I was hunting you to eat your brains?",
        options: ["As long as I am close to you.", "I’d let you catch me, just to make you happy."],
        logic: () => true // Both options are playful and allowed
    }
];

let currentQuestion = 0;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const popup = document.getElementById("popup");

function loadQuestion() {
    const question = questions[currentQuestion];
    questionContainer.textContent = question.text;
    optionsContainer.innerHTML = "";

    const buttons = question.options.map((option) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.addEventListener("click", () => {
            if (question.logic(option, Array.from(optionsContainer.children))) {
                nextQuestion();
            }
        });
        optionsContainer.appendChild(button);
        return button;
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionContainer.textContent = "Congraatssss YOU SCORED 100% 🎉";
        optionsContainer.innerHTML = "";
    }
}

function showPopup(message) {
    popup.textContent = message;
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

loadQuestion();
