// Initialize controllers
const storage = new Storage();
const data = new Data();
const state = new State();
const ui = new UI();

// Call initial function when page loads
document.addEventListener('DOMContentLoaded', printCurrentMeals);

// Get today's date into global variable for general use
let rightNow = new Date();
window.today = rightNow.setHours(0,0,0,0);

// Starts up retrieval of data from storage and put it into the UI
function printCurrentMeals() {
   data.getMeals();

   data.getLeftovers();

   ui.showMeals(allMeals);

   ui.showLeftovers();
}

// Set the state to show the data
state.showData();
