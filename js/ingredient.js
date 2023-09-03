import { Details } from "./details.js";

export class Ingredient {
    constructor(){
        this.getAllIng();
    }
    async getAllIng(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        let ingredients = await response.json();
        let ingredientData = ingredients.meals;
        this.displayIngredient(ingredientData);
    }
    displayIngredient(ingredientData){
        let ingredientContainer = '';
        for (let i = 0; i < 20; i++) {
            let ingredient = ingredientData[i];
            ingredientContainer += `
            <div class="col-md-3 p-4">
                <div class="ingredientCard card bg-black text-center " style="width: 18rem;" id="${ingredient.strIngredient}">
                    <i class="fa-solid fa-drumstick-bite text-white fa-2xl fs-1"></i>
                <div class="card-body text-white">
                    <h3 class="my-2">${ingredient.strIngredient}<h3>
                    <p class="card-text fs-5">${ingredient.strDescription.slice(0,70)}</p>
                </div>
                </div>
            </div>
            `
        };
        $("#ourContainer").html(ingredientContainer);
        $(".ingredientCard").on("click", function(){
            let ingName = this.getAttribute("id");
            console.log(ingName);
            let newIngredient = new Details();
            newIngredient.getIngredientDetails(ingName)
        })
    }
}