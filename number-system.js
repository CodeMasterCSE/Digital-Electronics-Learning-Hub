document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const fromSystem = document.getElementById('from-system');
    const toSystem = document.getElementById('to-system');
    const convertBtn = document.getElementById('convert-btn');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    convertBtn.addEventListener('click', convert);

    function convert() {
        error.textContent = '';
        if (!input.value) {
            result.value = '';
            return;
        }

        try {
            let decimal;

            // Validate input based on the selected number system
            const inputValue = input.value.trim();
            switch (fromSystem.value) {
                case 'decimal':
                    if (!/^\d+$/.test(inputValue)) throw new Error('Invalid digit for decimal system');
                    decimal = parseInt(inputValue, 10);
                    break;
                case 'binary':
                    if (!/^[01]+$/.test(inputValue)) throw new Error('Invalid digit for binary system');
                    decimal = parseInt(inputValue, 2);
                    break;
                case 'octal':
                    if (!/^[0-7]+$/.test(inputValue)) throw new Error('Invalid digit for octal system');
                    decimal = parseInt(inputValue, 8);
                    break;
                case 'hexadecimal':
                    if (!/^[0-9A-Fa-f]+$/.test(inputValue)) throw new Error('Invalid digit for hexadecimal system');
                    decimal = parseInt(inputValue, 16);
                    break;
                default:
                    throw new Error('Invalid input system');
            }

            if (isNaN(decimal)) {
                throw new Error('Invalid input for the selected number system');
            }

            let convertedResult;

            switch (toSystem.value) {
                case 'decimal':
                    convertedResult = decimal.toString(10);
                    break;
                case 'binary':
                    convertedResult = decimal.toString(2);
                    break;
                case 'octal':
                    convertedResult = decimal.toString(8);
                    break;
                case 'hexadecimal':
                    convertedResult = decimal.toString(16).toUpperCase();
                    break;
                default:
                    throw new Error('Invalid output system');
            }

            result.value = convertedResult;
        } catch (err) {
            error.textContent = err.message;
            result.value = '';
        }
    }
});
