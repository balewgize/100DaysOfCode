const form = document.getElementById('form');
const convertButton = document.getElementById('convert-btn');
const numberInput = document.getElementById('number');
const output = document.getElementById('output');

const convertToRoman = (num) => {
    // Define a map of decimal values to their Roman numeral counterparts
    const romanMap = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let romanNumeral = '';

    // Loop through each symbol, subtracting its value from num and adding its symbol to the result string
    for (let i = 0; i < romanMap.length; i++) {
        while (num >= romanMap[i].value) {
            romanNumeral += romanMap[i].symbol;
            num -= romanMap[i].value;
        }
    }

    return romanNumeral;
}

convertButton.addEventListener("click", () => {
    const number = Number(numberInput.value);

    if (number === 0) {
        output.innerHTML = "Please enter a valid number";
    } else if (number === -1) {
        output.innerHTML = "Please enter a number greater than or equal to 1";
    } else if (number >= 4000) {
        output.innerHTML = "Please enter a number less than or equal to 3999";
    } else {
        output.innerHTML = convertToRoman(number);
    }
});

