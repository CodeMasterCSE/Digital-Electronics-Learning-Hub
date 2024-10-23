document.addEventListener('DOMContentLoaded', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input2Group = document.getElementById('input2Group');
    const led1 = document.getElementById('led1');
    const led2 = document.getElementById('led2');
    const outputLed = document.getElementById('outputLed');
    const outputValue = document.getElementById('outputValue');
    const gateTitle = document.getElementById('gateTitle');
    const gateDescription = document.getElementById('gateDescription');

    const gateButtons = document.querySelectorAll('.gate-button');

    gateButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            gateButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            updateGateInfo(button.dataset.gate); // Pass the gate value directly
        });
    });

    function updateGateInfo(gate) {
        gateTitle.textContent = `${gate} Gate`;
        switch (gate) {
            case 'AND':
                gateDescription.textContent = 'Outputs true only when both inputs are true';
                input2Group.style.display = 'flex';
                break;
            case 'OR':
                gateDescription.textContent = 'Outputs true when at least one input is true';
                input2Group.style.display = 'flex';
                break;
            case 'NOT':
                gateDescription.textContent = 'Inverts the input (only uses Input 1)';
                input2Group.style.display = 'none';
                break;
            case 'NAND':
                gateDescription.textContent = 'Outputs false only when both inputs are true';
                input2Group.style.display = 'flex';
                break;
            case 'NOR':
                gateDescription.textContent = 'Outputs true only when both inputs are false';
                input2Group.style.display = 'flex';
                break;
            case 'XOR':
                gateDescription.textContent = 'Outputs true when inputs are different';
                input2Group.style.display = 'flex';
                break;
        }
        
        // Reset inputs and outputs to default
        resetInputsAndOutputs();
    }

    function resetInputsAndOutputs() {
        input1.checked = false; // Reset Input 1
        input2.checked = false; // Reset Input 2
        updateLED(led1, false); // Reset LED 1
        updateLED(led2, false); // Reset LED 2
        outputValue.textContent = 'N/A'; // Set output to N/A
        updateOutput(); // Update output to reflect changes
    }

    function updateLED(led, state) {
        led.className = `led ${state ? 'on' : 'off'}`;
    }

    function getGateOutput() {
        const gate = gateTitle.textContent.split(' ')[0];
        switch (gate) {
            case 'AND':
                return input1.checked && input2.checked;
            case 'OR':
                return input1.checked || input2.checked;
            case 'NOT':
                return !input1.checked;
            case 'NAND':
                return !(input1.checked && input2.checked);
            case 'NOR':
                return !(input1.checked || input2.checked);
            case 'XOR':
                return input1.checked !== input2.checked;
            default:
                return false;
        }
    }

    function updateOutput() {
        const output = getGateOutput();
        updateLED(outputLed, output);
        outputValue.textContent = output ? 'TRUE' : 'FALSE';
    }

    input1.addEventListener('change', () => {
        updateLED(led1, input1.checked);
        updateOutput();
    });
    input2.addEventListener('change', () => {
        updateLED(led2, input2.checked);
        updateOutput();
    });

    resetInputsAndOutputs();
});