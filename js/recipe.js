// This is js file specific to recipe getting from API 
// Display the recipes into container 
// https://www.themealdb.com/api/json/v1/1/search.php?s=
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood


import { Details } from "./details.js";

export class Recipes{
    constructor(){
    }
    async getRecipe(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        let recipeData = await response.json();
        // console.log(recipeData.meals);
        this.displayRecipes(recipeData);
    }
    displayRecipes(Data){
        let recipeContainer ='';
        for (let i = 0; i < Data.meals.length; i++) {
            let meal = Data.meals[i];
            recipeContainer += `
            <div class="col-md-3 recipeCard " id="${meal.idMeal}">
                <div class="cardHover position-relative overflow-hidden">
                    <div class="layer d-flex justify-content-center align-items-center">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    <div class="border-0 card" style="width: 18rem;" id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" class="card-img-top  m-auto" alt="...">
                </div>
                </div>
            </div>
            `;
        };
        $("#ourContainer").html(recipeContainer);
        $(".recipeCard").on("click", function(){
            let id = this.getAttribute('id');
            let meal = new Details();
            meal.getMealDetails(id);
        })
    }
    displayRecipe(Data){
        let recipeData = Data.meals[0];
        let recipeContainer ='';
        // Condition To Show Ingredients + Measures
        console.log(Data.meals[0].strIngredient1);
        let ingredients = ``;
        for (let i = 1; i <= 20; i++) {
            if (recipeData[`strIngredient${i}`]) {
                ingredients += `<li class="bg-primary-subtle p-2 rounded-3 m-2">${recipeData[`strMeasure${i}`]} ${recipeData[`strIngredient${i}`]}</li>`;
            }
        }
        console.log(ingredients);
        for (let i = 0; i < Data.meals.length; i++) {
            let meal = Data.meals[i];
            // console.log(meal);
            recipeContainer += `
            <div class="container recipePage text-white">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="rounded-2 img-fluid" alt="">
                        <h3 class="mt-4">${meal.strMeal}</h3>
                    </div>
                    <div class="col-md-8">
                        <h3>Insructions</h3>
                        <p>${meal.strInstructions}</p>
                        <h3>Area : <span>${meal.strArea}</span></h3>
                        <h3>Category : <span>${meal.strCategory}</span></h3>
                        <h3>Recipes :</h3>
                        <ul class="list-unstyled d-flex flex-wrap text-black">
                            ${ingredients}
                        </ul>
                        <h3 class="mb-3">Tags : <span class="bg-danger-subtle p-2 fs-6 rounded-3 text-black">${meal.strTags == null? "": meal.strTags}</span></h3>
                        <div class="my-2 pt-3">
                            <a class="text-white text-decoration-none px-3 py-2 rounded-3 my-5 bg-success" href="${meal.strSource}">Source</a>
                            <a class="text-white text-decoration-none px-3 py-2 rounded-3 my-5 bg-danger" href="${meal.strYoutube}">Youtube</a>
                        </div>
                    </div>
                </div>
            </div> 
            `;
        };
        $("#ourContainer").html(recipeContainer);
    }
}
