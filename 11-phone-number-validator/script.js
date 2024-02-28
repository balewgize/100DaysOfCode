const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

const checkPhoneNumber = (number) => {
    if (userInput.value == "") {
        alert("Please provide a phone number");
        return;
    }

    const etPhoneRegex = /^(?:\+251|0)9\d{8}$/;  // Ethiopian phone number
    const usPhoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/; // US phone number
    const validList = [usPhoneRegex, etPhoneRegex];

    const pTag = document.createElement("p");
    pTag.className = 'results-text'

    pTag.textContent = validList.some((regex) => regex.test(number))
        ? `Valid number: ${number}`
        : `Invalid number: ${number}`;

    resultsDiv.appendChild(pTag);
}


checkBtn.addEventListener("click", () => {
    checkPhoneNumber(userInput.value);
    userInput.value == "";
});

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkPhoneNumber(userInput.value);
        userInput.value == "";
    }

});

clearBtn.addEventListener("click", () => {
    resultsDiv.textContent = "";
});
