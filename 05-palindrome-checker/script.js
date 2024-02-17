const textInput = document.querySelector("#text-input");
const checkBtn = document.querySelector("#check-btn");
const result = document.querySelector("#result");


const isPlaindrome = (str) => {
    const cleaned = str.replace(/[\W_]/g, '').toLowerCase();
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

checkBtn.addEventListener("click", () => {
    const userInput = textInput.value;
    if (userInput) {
        if (isPlaindrome(userInput)) {
            result.textContent = `${userInput} is a palindrome`;
        } else {
            result.textContent = `${userInput} is not a palindrome`;
        }
    } else {
        alert("Please input a value");
    }
});
