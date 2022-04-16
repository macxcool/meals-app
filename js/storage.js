class Storage {
   constructor() {
      // Get IDs from global variables in env.js and compile into URLs
      this.baseURL = 'https://api.jsonstorage.net/v1/json/';
      this.id = JSON_STORAGE_ID;
      this.mealsID = JSON_MEALS_ID;
      this.key = JSON_API_KEY;
      this.mealsURL = this.baseURL + '/' + this.id + '/' + this.mealsID + '?apiKey=' + this.key;
      this.loID = JSON_LEFTOVERS_ID;
      this.loURL = this.baseURL + '/' + this.id + '/' + this.loID + '?apiKey=' + this.key;
   }
   
   // these functions are for the main 'meals' data

   // Load Meals data from jsonstorage API
   // Output: JSON object
   loadDataFromAPI() {
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.open('GET', this.mealsURL, false);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');

      xmlHttp.send();

      const mealsData = JSON.parse(xmlHttp.response);

      return mealsData;
   }

   // Save allMeals to API
   // Input: array
   saveDataToAPI(allMeals) {
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.open('PUT', this.mealsURL, true);
      xmlHttp.setRequestHeader('Content-Type', 'application/json')
      const xmlHttpParams = {
         "files": "mealsData"
      }

      xmlHttp.onload = () => {
         const xmlHttpResponse = xmlHttp.response;
         console.log(xmlHttpResponse);
      }

      xmlHttp.send(JSON.stringify(allMeals));
   }

   // these functions are for the leftovers data

   // Get Leftovers data from API
   // Output: JSON array
   loadLODataFromAPI() {
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.open('GET', this.loURL, false);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');

      xmlHttp.send();

      const loData = JSON.parse(xmlHttp.response);
      
      return loData;
   }

   // Save leftovers data back to API
   saveLODataToAPI() {
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.open('PUT', this.loURL, true);
      xmlHttp.setRequestHeader('Content-Type', 'application/json')
      const xmlHttpParams = {
         "files": "loData"
      }

      xmlHttp.onload = () => {
         const xmlHttpResponse = xmlHttp.response;
         console.log(xmlHttpResponse);
      }

      xmlHttp.send(JSON.stringify(leftovers));
   }

}
