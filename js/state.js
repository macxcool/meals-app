class State {
   constructor() {
   }

   // State is 'showData'. Mainly initializes button listeners
   showData() {
      ui.listenButtons()
   }

   // Change cards to edit state. Change para to textarea. Change Edit to Save.
   // Input: ID text
   toEditState(cardID) {
      ui.changeToTextArea(cardID);
      ui.changeToSaveButton(cardID);
      if(cardID == 'addnewmeal') {
         ui.changeTitle(cardID);
      }
   }

   // Change card back to show date. Also save the changed data'
   // Input: date string, html-format string
   toShowState(mealID, text) {
      if(mealID == 'leftovers') {
         data.saveLeftovers(text);
      } else {
         data.saveMeal(mealID, text);
      }
      ui.changeToPara(mealID);
      ui.changeToEditButton(mealID);
      if(!document.getElementById('addnewmeal')) {
         ui.addNewMeal();
      }
   }

}
