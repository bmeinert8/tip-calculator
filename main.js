var billInput = document.querySelector('.js-bill-input');
var tipButtons = document.querySelectorAll('.js-tip-btn');
var customTip = document.querySelector('.js-custom-tip');
var peopleInput = document.querySelector('.js-people-input');
var errorMessage = document.querySelector('.js-error');
var tipPerPerson = document.querySelector('.js-person-tip')
var totalPerPerson = document.querySelector('.js-person-total');
var resetButton = document.querySelector('.js-reset-button');

// Event Listeners
let selectedTip = 0;

//Tip buttons

tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    // remove the active class from all tip buttons
    tipButtons.forEach(btn => btn.classList.remove('tip-active'));

    // add an active class to the button clicked
    button.classList.add('tip-active');

    // store the selected tip percentage from the data set
    selectedTip = parseFloat(button.dataset.tip);
    console.log(selectedTip);
    //remove custom tip value when tip button is clicked if present.
    customTip.value = '';
  });
});

// Custom tip input

customTip.addEventListener('input', () => {
  //remove active class from the seleced tip button
  tipButtons.forEach(btn => btn.classList.remove('tip-active'));

  //Store the selected tip percentage
  selectedTip = parseFloat(customTip.value) || 0;
  console.log(selectedTip);
});



