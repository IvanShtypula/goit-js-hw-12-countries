import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import markUp from '../templates/template.hbs';
import debounce from '../../node_modules/lodash.debounce/index.js'
const countryInfo = document.querySelector('.js_container');
const input = document.querySelector('.js_input');
input.addEventListener('input', debounce(fetchCountries, 500));

PNotify.defaultStack = {
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body
}

function fetchCountries(event){
 return fetch(`https://restcountries.eu/rest/v2/name/${event.target.value}`)  
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.length > 10) {
      PNotify.error('Too many matches found. Please enter a more spacific query!');
      return;
    }
    if(data.length > 1){
      let markupList = "";
      data.map((country) => (markupList += `<p>${country.name}</p>`));
      countryInfo.innerHTML = markupList;
    }
    if(data.length === 1){
      countryInfo.innerHTML = markUp(...data);
    }
  })
}



 
