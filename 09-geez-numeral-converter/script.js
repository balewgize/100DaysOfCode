const convertButton = document.getElementById('convert-btn');
const numberInput = document.getElementById('number');
const output = document.getElementById('output');
const geezDigitsOutput = document.getElementById('geez-digits');
const geezDigits = {
    0: "",
    1: "፩",
    2: "፪",
    3: "፫",
    4: "፬",
    5: "፭",
    6: "፮",
    7: "፯",
    8: "፰",
    9: "፱",
    10: "፲",
    20: "፳",
    30: "፴",
    40: "፵",
    50: "፶",
    60: "፷",
    70: "፸",
    80: "፹",
    90: "፺",
    100: "፻",
    10000: "፼",
};

const convertToGeez = (number) => {
    // Base case for recursion
    if (number === 0) return geezDigits[0];
    if (number <= 9) return geezDigits[number];

    // Helper function to handle numbers within specific ranges
    const getGeezNumeral = (num, divisor, geezSymbol) => {
        const quotient = Math.floor(num / divisor);
        const remainder = num % divisor;
        const quotientPart = quotient > 1 ? convertToGeez(quotient) : "";
        return quotientPart + geezSymbol + convertToGeez(remainder);
    };

    if (number < 100) {
        return geezDigits[Math.floor(number / 10) * 10] + geezDigits[number % 10];
    } else if (number < 10000) {
        return getGeezNumeral(number, 100, geezDigits[100]);
    } else {
        return getGeezNumeral(number, 10000, geezDigits[10000]);
    }
};

const showGeezDigits = () => {
    Object.entries(geezDigits).forEach(([number, geezDigit]) => {
        geezDigitsOutput.innerHTML += `${number}: ${geezDigit}<br>`;
    });
};


convertButton.addEventListener("click", () => {
    const number = Number(numberInput.value);

    if (number <= -1) {
        output.innerHTML = "እባክዎን አንድ ወይም ከአንድ የሚበልጥ ቁጥር ይጻፉ።";
    } else if (number === 0) {
        output.innerHTML = "ዜሮ በግዕዝ ምልክት የላትም።";
    } else {
        output.innerHTML = convertToGeez(number);
    }
    output.classList.remove("hidden");
});

showGeezDigits();
