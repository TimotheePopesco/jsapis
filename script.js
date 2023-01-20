// On liste les éléments disponible sur notre page html
//Les boissons
const submitButton = document.querySelector(".submit-button");
const searchText = document.querySelector("#search-text");
const display = document.querySelector("#drinks-display");
const luckyButton = document.querySelector(".lucky");
// La nourriture
const searchInput = document.querySelector('#searchInput');
const results = document.querySelector('#results');
const randomMeal = document.querySelector('#randomMeal');
const chooseFCategory = document.querySelector("#categoryF");



function getDrinkCategory () {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
    .then(response => response.json())
    .then(data => {
        // on récupère l'élément select dans lequel on va ajouter des options
        const chooseBCategory = document.querySelector("#categoryB");

        // on boucle sur les informations récupérées de l'API
        data.drinks.forEach(drink => {
            // on créé un élément <option>
            const optionDrink = document.createElement('option')
            // on rajoute un contenu dans l'option
            optionDrink.innerHTML = drink.strCategory
            // on rajouter une valeur dans l'option
            optionDrink.value = drink.strCategory
            // on ajoute l'option dans le select
            chooseBCategory.appendChild(optionDrink)
        })

        // initialise l'évènement on change sur le select lines
        selectDrinkCategory()
    })
}

function selectDrinkCategory() {
  const chooseBCategory = document.querySelector("#categoryB");
  // on ajoute un event qui va se déclencher quand on change la valeur du select des lignes
  chooseBCategory.addEventListener('change', (event) => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + event.target.value
    fetch(endpoint)
        .then(response => response.json())
        .then((result) => returnCategory(result));
      chooseBCategory.value = "";
      display.innerHTML = "";
  })
}


function getDrinkNames() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText.value}`
  )
    .then((response) => response.json())
    .then((result) => DisplayResults(result));
  searchText.value = "";
  display.innerHTML = "";
}


function returnCategory(result) {
  const drinkNames = result.drinks;
  drinkNames.forEach(element => {
    let { thumbnail, div, drink } = declareVar();
    thumbnail.src = element.strDrinkThumb;
    drink.innerText = element.strDrink;

    div.appendChild(thumbnail);
    div.appendChild(drink);
    display.appendChild(div)
  })
  function declareVar() {

    let thumbnail = document.createElement("img");
    let drink = document.createElement("h2");
    let div = document.createElement("div");
    return { thumbnail, drink, div };
  }
}


function DisplayResults(result) {
  const drinkNames = result.drinks;
  if (result.drinks == null) {
    // erreur
    display.innerHTML = "<h2'> No Drinks :( </h2>";
    return;
  }
  drinkNames.forEach((element) => {
    let { thumbnail, drink, div, instructions } = declareVar();
    
    //thumbnail from API
    thumbnail.src = element.strDrinkThumb;
    div.appendChild(thumbnail);

    //drink title
    drink.innerText = element.strDrink;
    div.appendChild(drink);

    //drink instructions in p element
    instructions.innerText = element.strInstructions;
    div.appendChild(instructions);
    display.appendChild(div);
  });


  function declareVar() {

    let thumbnail = document.createElement("img");
    let drink = document.createElement("h2");
    let div = document.createElement("div");
    let instructions = document.createElement("p");
    return { thumbnail, div, drink, instructions };
  }
}


function randomize() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  )
    .then((response) => response.json())
    .then((result) => DisplayResults(result));
  searchText.value = "";
  display.innerHTML = "";
}


//listeners
submitButton.addEventListener("click", getDrinkNames);
luckyButton.addEventListener("click", randomize);
getDrinkCategory()

function getFoodCategory () {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then(response => response.json())
    .then(data => {
        // on récupère l'élément select dans lequel on va ajouter des options
        const chooseFCategory = document.querySelector("#categoryF");

        // on boucle sur les informations récupérées de l'API
        data.meals.forEach(meal => {
            // on créé un élément <option>
            const optionMeals = document.createElement('option')
            // on rajoute un contenu dans l'option
            optionMeals.innerHTML = meal.strCategory
            // on rajouter une valeur dans l'option
            optionMeals.value = meal.strCategory
            // on ajoute l'option dans le select
            chooseFCategory.appendChild(optionMeals)
        })

        // initialise l'évènement on change sur le select lines
        selectFoodCategory()
    })
}

function selectFoodCategory() {
  const chooseFCategory = document.querySelector("#categoryF");
  // on ajoute un event qui va se déclencher quand on change la valeur du select des lignes
  chooseFCategory.addEventListener('change', (event) => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + event.target.value
    fetch(endpoint)
        .then(response => response.json())
        .then((result) => returnCategoryF(result));
      chooseFCategory.value = "";
      results.innerHTML = "";
  })
}

function returnCategoryF(result) {
  const mealNames = result.meals;
  mealNames.forEach(element => {
    let { thumbnail, div, meal } = declareVar();
    thumbnail.src = element.strMealThumb;
    meal.innerText = element.strMeal;

    div.appendChild(thumbnail);
    div.appendChild(meal);
    results.appendChild(div)
  })
  function declareVar() {

    let thumbnail = document.createElement("img");
    let meal = document.createElement("h2");
    let div = document.createElement("div");
    return { thumbnail, meal, div };
  }
}
getFoodCategory()

let urlSearch = '';

const fetchSearch = async(url) => {
	meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${url}`)
    .then(res => res.json())
    .then(res => res.meals) 
};

const searchDisplay = async() => {
  await fetchSearch(urlSearch);

  if (meals == null){
    results.innerHTML = `<span class="noResult">No results</span>`
  }
  else{
    results.innerHTML = (
    
      meals.map(meal => (
              
        `
        <div class="searchContainer">
          <img src='${meal.strMealThumb}' /></br>
          <h2>${meal.strMeal}</h2>
          <div class="infos">
            <div>origin : ${meal.strArea}</div>
            <div>category : ${meal.strCategory}</div>
          </div>
          <p>${meal.strInstructions}</p>
        </div>
        `
      )).join('')
    );
  }

};

searchInput.addEventListener('input', (e) => {
  urlSearch = `search.php?s=${e.target.value}`;
  searchDisplay();
});


// GET RANDOM MEAL
const randomMealDisplay = async() => {
  await fetchSearch('random.php');

  results.innerHTML = (
    
    meals.map(meal => (
            
      `
        <div class="randomContainer">
          <img src='${meal.strMealThumb}' />
          <h2>${meal.strMeal}</h2>
          <div class="infos">
            <div>origin : ${meal.strArea}</div>
            <div>catégory : ${meal.strCategory}</div>
          </div>
          <p>${meal.strInstructions}</p>
        </div>
      `
    ))
  );
};

randomMeal.addEventListener('click', randomMealDisplay)
randomMealDisplay();