class Storage {
   constructor() {
      this.baseURL = 'https://api.jsonstorage.net/v1/json/';
      this.id = '23777c25-a959-4679-bf84-674ff7e0cd79';
      this.mealsID = '123ab060-9075-473f-a2d1-b9aec11b555e';
      this.key = '4d204f15-59fb-4221-b320-575c09384940';
      this.mealsURL = this.baseURL + '/' + this.id + '/' + this.mealsID + '?apiKey=' + this.key;
      this.loID = 'c5acce59-cda0-4411-a0e2-68ab787aafeb';
      this.loURL = this.baseURL + '/' + this.id + '/' + this.loID + '?apiKey=' + this.key;
   }
   
   // these functions are for the main 'meals' data
   loadDataFromAPI() {
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.open('GET', this.mealsURL, false);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');

      xmlHttp.send();

      const mealsData = JSON.parse(xmlHttp.response);

      return mealsData;
   }

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
   loadLODataFromAPI() {
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.open('GET', this.loURL, false);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');

      xmlHttp.send();

      const loData = JSON.parse(xmlHttp.response);
      
      return loData;
   }

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
