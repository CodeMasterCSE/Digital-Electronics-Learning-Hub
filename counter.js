document.addEventListener('DOMContentLoaded', () => {
    const leds = document.querySelectorAll('.led');
    const binaryDisplay = document.querySelector('.binary-display');
    const decimalDisplay = document.querySelector('.decimal-display');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');

    let binaryNumber = '0000';

    function updateDisplay() {
        binaryDisplay.textContent = `Binary: ${binaryNumber}`;
        decimalDisplay.textContent = `Decimal: ${parseInt(binaryNumber, 2)}`;

        leds.forEach((led, index) => {
            const bit = binaryNumber[index];
            led.classList.toggle('on', bit === '1');
            led.textContent = bit;
            led.setAttribute('aria-label', `Bit ${3 - index} is ${bit === '1' ? 'on' : 'off'}`);
        });
    }

    function incrementBinary() {
        const decimal = parseInt(binaryNumber, 2) + 1;
        if (decimal > 15) return;
        binaryNumber = decimal.toString(2).padStart(4, '0');
        updateDisplay();
    }

    function decrementBinary() {
        const decimal = parseInt(binaryNumber, 2) - 1;
        if (decimal < 0) return;
        binaryNumber = decimal.toString(2).padStart(4, '0');
        updateDisplay();
    }

    incrementBtn.addEventListener('click', incrementBinary);
    decrementBtn.addEventListener('click', decrementBinary);

    updateDisplay();
});