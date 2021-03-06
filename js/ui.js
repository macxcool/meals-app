class UI {
   constructor() {
      // Some useful elements used later
      this.mealsList = document.getElementById('mealsList');
      this.leftovers = document.getElementById('leftoversCol');
      this.showAll = document.getElementById('title');
   }

   // Initialize listeners for buttons and handle button pushes
   listenButtons() {
      // The buttons in the mail 'mealsList' section
      this.mealsList.addEventListener('click', event => {
         const isButton = event.target.nodeName === 'BUTTON';
         // Only continue on if it was a button that was pushed
         if (!isButton) {
            return;
         }
         
         // Respond to various buttons by their text
         var buttonType = event.target.innerHTML;
         switch (buttonType) {
            // Edit button was pushed. Do edit stuff.
            case 'Edit':
               var mealID = event.target.parentElement.parentElement.parentElement.id;
               state.toEditState(mealID);
               break;

            // Save button was pushed. Do save stuff.
            case 'Save':
               var mealID = event.target.parentElement.parentElement.parentElement.id;
               var text = event.target.parentElement.parentElement.getElementsByTagName('textarea')[0].value;
               state.toShowState(mealID, text);
               break;

            // Add New button was pushed. Add new card with proper info.
            case 'Add New':
               // get next date from Data controller
               var mealID = data.getNextMealID();
               // and change date on New Meal card
               var newMealCard = document.getElementById('addnewmeal');
               // first scroll there, though
               newMealCard.scrollIntoView({ behavior: 'smooth' });
               newMealCard.id = mealID;
               // do the same with the heading
               const heading = newMealCard.getElementsByTagName('h5')[0];
               const niceDate = dayjs(mealID).format('dddd, MMM DD, YYYY');
               heading.innerHTML = niceDate;
               // and call the Edit State
               state.toEditState(mealID);
               break;
         
            default:
               break;
         }
         
      })

      // Add listeners and responses for the 'leftovers' buttons
      this.leftovers.addEventListener('click', event => {
         const isButton = event.target.nodeName === 'BUTTON';
         if (!isButton) {
            return;
         }

         var buttonType = event.target.innerHTML;
         switch (buttonType) {
            // Edit button has been clicked
            case 'Edit':
               state.toEditState('leftovers');
               break;

            // Save button has been clicked
            case 'Save':
               var text = event.target.parentElement.parentElement.getElementsByTagName('textarea')[0].value;
               state.toShowState('leftovers', text);
               break;
         
            default:
               break;
         }
      })

      // Listener for the top 'Show All' button
      this.showAll.addEventListener('click', event => {
         const isButton = event.target.nodeName === 'BUTTON';
         if (!isButton) {
            return;
         }

         var buttonType = event.target.innerHTML;
         switch (buttonType) {
            // Show All button has been clicked
            case 'Show All':
               // Reload page with showall URL
               this.addOldMeals();
               this.changeShowAllBtn();

               break;

            // Reset button has been clicked
            case 'Reset':
               // Reload page with normal state
               this.removeOldMeals();
               this.changeResetBtn();

               break;

            default:
               break;
         }
      })
   }

   // Show the meals in the UI. Only shows today and onward.
   // Input: array
   showMeals(meals, all = false) {
      // loop through the meals
      for (const key in meals) {
         // get the individual meal and manipulate the date and text
         const meal = meals[key];
         // generate Date from meal.date
         let thisDate = new Date(meal.date);
         // skip if the date is older than today
         if(all == false && thisDate < today) {
            continue;
         }
         // create a nice, printable version of the date
         let niceDate  = thisDate.toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric", year:"numeric" });
         // and get the text html-formatted
         let niceText = data.getDisplayText(meal.date);

         // Add new card
         this.addMealCard(meal.date, niceText, niceDate, 'Edit', 'down')
      }
      
      // Add 'New Meal' card after the list
      this.addNewMeal();
   }

   // Create and add a meal card to the page
   // Input: date string, html string, string, string, string
   addMealCard(mealID, text, title, button, direction) {
      // create a new div and populate the classes and id
      let newDiv = document.createElement('div');
      newDiv.classList = 'card mb-3 w-75 mx-auto bg-info rounded-3 shadow';
      newDiv.id = mealID;
      // now add it to the mealsList 'col'
      let newCard = '';
      if(direction == 'down') {
         newCard = this.mealsList.appendChild(newDiv);
      } else if(direction == 'up') {
         // Get the first meal card so we can insert before it
         const firstMeal = this.mealsList.getElementsByClassName('card')[0];
         newCard = this.mealsList.insertBefore(newDiv, firstMeal);
      }
      // and finally populate the card data
      newCard.innerHTML = `
         <div class="card-body">
            <div class="card-header">
               <h5 class="card-title text-center">${title}</h5>
            </div>
            <p class="card-text">
               ${text}
            </p>
            <div class="text-center">
               <button class="btn btn-primary mt-2">${button}</button>
            </div>
         </div>
      `
   }

   // Input: date string
   changeToTextArea(mealID) {
      // get the proper card
      const mealCard = document.getElementById(mealID);
      // and the para with the text
      const cardText = mealCard.getElementsByTagName('p')[0];
      // and the last div with the button for later
      const buttonDiv = mealCard.getElementsByTagName('button')[0].parentElement;
      // get this meal text from the global allMeals variable
      const niceText = data.getEditText(mealID);
      // count the lines to get default size of textarea
      const numLines = niceText.split(/\r\n|\r|\n/).length;
      // create a new textarea with the same content
      let newTextarea = document.createElement('textarea');
      newTextarea.classList = 'form-control';
      newTextarea.setAttribute('cols', '30');
      newTextarea.setAttribute('rows', numLines + 1);
      newTextarea.innerHTML = niceText;
      // remove the para
      cardText.remove();
      // and add the textarea in before the button Div
      mealCard.firstElementChild.insertBefore(newTextarea, buttonDiv);
   }

   // Change textarea to para
   // Input: date string
   changeToPara(mealID) {
      // Get card where button was clicked and get some elements
      const mealCard = document.getElementById(mealID);
      const textArea = mealCard.getElementsByTagName('textarea')[0];
      const buttonDiv = mealCard.getElementsByTagName('button')[0].parentElement;
      // transform text into html-format
      let niceText = data.getDisplayText(mealID);

      // Create para to replace textarea
      let newPara = document.createElement('p');
      newPara.classList = 'card-text';
      newPara.innerHTML = niceText;

      // And replace textarea with para
      textArea.remove();
      mealCard.firstElementChild.insertBefore(newPara, buttonDiv);
   }

   // Change Edit button to Save button
   // Input: date string
   changeToSaveButton(mealID) {
      const mealCard = document.getElementById(mealID);
      const editButton = mealCard.getElementsByTagName('button')[0];
      editButton.innerText = 'Save';
   }

   // Change Save button to Edit
   // Input: date string
   changeToEditButton(mealID) {
      const mealCard = document.getElementById(mealID);
      const saveButton = mealCard.getElementsByTagName('button')[0];
      saveButton.innerText = 'Edit';
   }

   // Change date to nice title for card
   // Input: date string
   changeTitle(mealID) {
      const mealCard = document.getElementById(mealID);
      const heading = mealCard.getElementsByTagName('h5');
      const niceDate = dayjs(mealID).format('dddd, MMM DD, YYYY');
      heading.innerHTML = niceDate;
   }

   // Add 'New Meal' card to end of page
   addNewMeal() {
      let id = 'addnewmeal';
      let text = '- This space left intentionally blank. ;-)';
      let title = 'The Next Day After The Last'
      let button = 'Add New'

      this.addMealCard(id, text, title, button, 'down');
   }

   // Put leftovers sidebar onto page
   showLeftovers() {
      // Get html-format text
      const niceText = data.getDisplayText('leftovers');
      
      // create a new div and populate the classes and id
      let newDiv = document.createElement('div');
      newDiv.classList = 'card bg-light border-end-0 border-top-0 border-bottom-0 px-3 sticky-top';
      newDiv.id = 'leftovers';
      // now append it to the mealsList 'col'
      let newCard = this.leftovers.appendChild(newDiv);
      // and finally populate the card data
      newCard.innerHTML = `
         <div class="card-body">
            <h5 class="card-title">In-Fridge Leftovers</h5>
            <p class="card-text">
               ${niceText}
            </p>
            <div class="d-flex justify-content-between">
               <button class="btn btn-outline-primary btn-sm mt-2">Edit</button>
               <a class="mt-2" href="#top"><img src="images/chevron-double-up.svg" alt="Chevron Double UP" width="16" height="16"></img></a>
            </div>
            
         </div>
      `
   }

   // Change Show All button to Reset button
   changeShowAllBtn() {
      const showAllBtn = this.showAll.getElementsByTagName('button')[0];
      showAllBtn.innerText = 'Reset';
   }

   // Change Reset button to Show All button
   changeResetBtn() {
      const resetBtn = this.showAll.getElementsByTagName('button')[0];
      resetBtn.innerText = 'Show All';
   }

   // Add old (before today) meals at top of page
   addOldMeals() {
      // Turn 'today' into mealID format
      const todayMealID = dayjs(today).format('MM/DD/YYYY');
      // Get the index of today's meal
      const todayIndex = allMeals.findIndex(meal => meal.date == todayMealID);
      // And slice the allMeals array before today
      const oldMeals = allMeals.slice(0, todayIndex);

      for(const key in oldMeals.reverse()) {
         // Get the meal in fix up the data
         const meal = oldMeals[key];
         // Get date and manipulate
         const date = meal.date;
         // create a nice, printable version of the date
         const niceDate = dayjs(date, 'MM/DD/YYYY').format('dddd, MMM DD, YYYY');
         // and get the text and format it for showing as html
         let niceText = meal.text;
         niceText = niceText.replace(/(?:\r\n|\r|\n)/g, "<br>");
         niceText = niceText.replace(/(?:\t)/g, '&nbsp;&nbsp;&nbsp;')

         // Add new card
         this.addMealCard(date, niceText, niceDate, 'Edit', 'up');
      }
   }

   // Remove old meals from page
   removeOldMeals() {
      const todayIndex = allMeals.findIndex(meal => meal.date == dayjs(today).format('MM/DD/YYYY'));
      const oldMeals = allMeals.slice(0, todayIndex);

      for(const key in oldMeals) {
         document.getElementById(oldMeals[key].date).remove();
      }
   }
}
