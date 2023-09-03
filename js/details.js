import { Recipes } from "./recipe.js";

export class Details {
    constructor(){
        
    }
    async getMealDetails(id){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        console.log(data);
        let ourRecipe = new Recipes();
        ourRecipe.displayRecipe(data);
    }
    async getCategoryDetails(strCategory){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
        let data = await response.json();
        console.log(data);
        let recipeofCategories = new Recipes();
        recipeofCategories.displayRecipes(data);
    }
    async getIngredientDetails(ingIngredient){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingIngredient}`);
        let data = await response.json();
        console.log(data);
        let recipeofIngredient = new Recipes();
        recipeofIngredient.displayRecipes(data);
    }
    async getAreaDetails(areaName){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        let data = await response.json();
        console.log(data);
        let recipeofArea = new Recipes();
        recipeofArea.displayRecipes(data);
    }
}