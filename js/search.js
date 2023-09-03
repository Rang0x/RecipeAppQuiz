import { Details } from "./details.js";


export class Search {
    constructor(name, letter){
        this.name = name;
        this.letter = letter;
    }
    async getRecipesByName(name){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.name}`) 
        let data = await response.json();
        console.log(data);
        this.displayResults(data)
    }
    async getRecipesByLetter(letter){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.letter}`) 
        let data = await response.json();
        console.log(data);
        this.displayResults(data)
    }
    displayResults(data){
        console.log("HIIIIIIIIIIIIIIII");
        let resultContainer = '';
        for (let i = 0; i < data.meals.length; i++) {
            let result = data.meals[i];
            resultContainer += `
            <div class="col-md-3 recipeCard " id="${result.idMeal}">
                <div class="cardHover position-relative overflow-hidden">
                    <div class="layer d-flex justify-content-center align-items-center">
                        <h3>${result.strMeal}</h3>
                    </div>
                    <div class="border-0 card" style="width: 18rem;">
                    <img src="${result.strMealThumb}" class="card-img-top  m-auto" alt="...">
                </div>
                </div>
            </div>
            `;
        };
        console.log(resultContainer);
        $("#ourContainer").html(resultContainer);
        $(".recipeCard").on("click", function(){
            let id = this.getAttribute('id');
            let meal = new Details();
            meal.getMealDetails(id);
        })
    }
}