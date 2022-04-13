class State {
   constructor() {
      this.something = '';
   }

   showData() {
      ui.listenButtons()
   }

   toEditState(cardID) {
      ui.changeToTextArea(cardID);
      ui.changeToSaveButton(cardID);
      if(cardID == 'addnewmeal') {
         ui.changeTitle(cardID);
      }
   }

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
