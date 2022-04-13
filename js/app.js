const storage = new Storage();
const data = new Data();
const state = new State();
const ui = new UI();

document.addEventListener('DOMContentLoaded', printCurrentMeals);

let rightNow = new Date();
window.today = rightNow.setHours(0,0,0,0);

function printCurrentMeals() {
   data.getMeals();

   data.getLeftovers();

   ui.showMeals(allMeals);

   ui.showLeftovers();

   //ui.toTopButton();
}

state.showData();
