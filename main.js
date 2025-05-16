var billInput = document.querySelector('.js-bill-input');
var tipButtons = document.querySelectorAll('.js-tip-btn');
var customTip = document.querySelector('.js-custom-tip');
var peopleInput = document.querySelector('.js-people-input');
var peopleError = document.querySelector('.js-people-input-container');
var errorMessage = document.querySelector('.js-error');
var tipPerPerson = document.querySelector('.js-person-tip');
var totalPerPerson = document.querySelector('.js-person-total');
var resetButton = document.querySelector('.js-reset-button');
var historyButton = document.querySelector('.js-history-button');
var closeButton = document.querySelector('.js-close-modal-btn');

// Event Listeners
let selectedTip = 0;

//Tip buttons

tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // remove the active class from all tip buttons
    tipButtons.forEach((btn) => btn.classList.remove('tip-active'));

    // add an active class to the button clicked
    button.classList.add('tip-active');

    // store the selected tip percentage from the data set
    selectedTip = parseFloat(button.dataset.tip);
    console.log(selectedTip);
    //remove custom tip value when tip button is clicked if present.
    customTip.value = '';
    calculateTip();
  });
});

// Custom tip input

customTip.addEventListener('input', () => {
  //remove active class from the seleced tip button
  tipButtons.forEach((btn) => btn.classList.remove('tip-active'));

  //Store the selected tip percentage
  selectedTip = parseFloat(customTip.value) || 0;
  console.log(selectedTip);
  calculateTip();
});

// Bill input
billInput.addEventListener('input', calculateTip);

//People input
peopleInput.addEventListener('input', calculateTip);

// Reset button
resetButton.addEventListener('click', () => {
  // Reset all inputs and outputs
  billInput.value = '';
  customTip.value = '';
  peopleInput.value = '';
  selectedTip = 0;
  tipPerPerson.textContent = '$0.00';
  totalPerPerson.textContent = '$0.00';
  tipButtons.forEach((btn) => btn.classList.remove('tip-active'));
  errorMessage.classList.add('invisible');
  resetButton.classList.remove('reset-active');
});

// History button
historyButton.addEventListener('click', () => {
  const historyModal = document.querySelector('.js-modal');
  historyModal.classList.remove('modal-hidden');
});

// Close button
closeButton.addEventListener('click', () => {
  const historyModal = document.querySelector('.js-modal');
  historyModal.classList.add('modal-hidden');
});

// Helper function
function parseNumber(value, defaultValue) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

// Add calculation function
function calculateTip() {
  const bill = parseNumber(billInput.value, 0);
  const people = parseNumber(peopleInput.value, 0);
  const tipPercentage = parseNumber(selectedTip, 0) / 100;

  if (bill <= 0 || people <= 0 || tipPercentage <= 0) {
    if (people <= 0) {
      errorMessage.classList.remove('invisible');
      peopleError.classList.add('people-container-error');
    }
    tipPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
    return;
  }

  if (people > 0) {
    errorMessage.classList.add('invisible');
    peopleError.classList.remove('people-container-error');
  }

  const tipAmount = (bill * tipPercentage) / people;
  const totalAmount = bill / people + tipAmount;

  tipPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
  totalPerPerson.textContent = `$${totalAmount.toFixed(2)}`;

  resetButton.classList.add('reset-active');
}
