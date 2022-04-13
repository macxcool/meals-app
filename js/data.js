class Data {
   constructor() {
      this.location = 'data.json';
   }

   getMeals() {
      const mealsData = storage.loadDataFromAPI();
      
      window.allMeals = mealsData;

      return allMeals;
   }

   getLeftovers() {
      const loData = storage.loadLODataFromAPI()

      window.leftovers = loData;
      
      return leftovers;
   }

   getEditText(mealID) {
      let mealText = '';
      if(mealID == 'leftovers') {
         return leftovers['leftovers'];
      } else {
         try {
            const specificMeal = allMeals.find(meal => meal.date == mealID);
            mealText = specificMeal.text;
         } catch (e) {
            mealText = '- '
         } finally {
            return mealText;
         }
      }
   }

   getDisplayText(mealID) {
      let mealText = '';
      if(mealID == 'leftovers') {
         mealText = leftovers.leftovers;
      } else {
         const specificMeal = allMeals.find(meal => meal.date == mealID);
         mealText = specificMeal.text;
      }
      // replace newlines with <br>
      mealText = mealText.replace(/(?:\r\n|\r|\n)/g, "<br>");
      // replace tabs with spaces
      mealText = mealText.replace(/(?:\t)/g, '&nbsp;&nbsp;&nbsp;')

      return mealText;
   }

   getNextMealID() {
      // get the last date (mealID) from the array
      const lastMealID = allMeals[allMeals.length - 1].date;
      // change this to a date and then add 1 day to get the next one
      let nextMealDate = new Date(lastMealID);
      nextMealDate.setDate(nextMealDate.getDate() + 1);
      // and get a nice mealID string
      const iso = nextMealDate.toISOString()
      const nextMealID = iso.substring(5,7) + '/' + iso.substring(8,10) + '/' + iso.substring(0,4);

      return nextMealID;
   }

   newMeal($date, $data) {

   }

   saveMeal(mealID, text) {
      // find leading spaces and replace with tab
      let mealText = text.replace(/(\n)\s+(-)/g, "$1\t$2");
      
      // check to see if mealID is in allMeals array
      // if yes, change it in the array
      // if no, push it to the end of the array
      if(allMeals.find(meal => meal.date === mealID)) {
         let mealIndex = allMeals.findIndex(meal => meal.date == mealID);
         allMeals[mealIndex].text = mealText;
      } else {
         let newMeal = {
            "date": mealID,
            "text": mealText
         }
         allMeals.push(newMeal);
      }

      this.saveAllMeals(allMeals);
   }

   saveAllMeals(allMeals) {
      // check for old data and clean it up
      // get a Date string for today
      //const minus14 = new Date(today - (2*24*60*60*1000));
      // now loop through allMeals and splice out old meals
      /* for (let i = 0; i < allMeals.length; i++) {
         let thisDate = new Date(allMeals[i].date);
         console.log(thisDate);
         if (thisDate < minus14) {
            allMeals.splice(i, 1);
         }
      } */
      
      storage.saveDataToAPI(allMeals);
   }

   saveLeftovers(text) {
      // find leading spaces and replace with tab
      let loText = text.replace(/(\n)\s+(-)/g, "$1\t$2");
      
      leftovers.leftovers = loText;

      storage.saveLODataToAPI();
   }

   deleteMeal($date) {

   }

   cleanUpOldData() {

   }
}
