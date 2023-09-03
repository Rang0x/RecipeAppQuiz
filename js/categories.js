import { Details } from "./details.js";

export class Category {
    constructor(){
        this.getAllCat();
    }
    async getAllCat(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let categories = await response.json();
        let categoryData = categories.categories;
        this.displayCategories(categoryData);
    }
    displayCategories(categoryData){
        let categoryContainer = '';
        for (let i = 0; i < categoryData.length; i++) {
            let category = categoryData[i];
            categoryContainer += `
            <div class=" col-md-3 categoryCard" id="${category.strCategory}">
            <div class="cardHover position-relative overflow-hidden">
            <div class="layer d-flex flex-column justify-content-center align-items-center">
                <h3>${category.strCategory}</h3>
                <p class="w-75">${category.strCategoryDescription.slice(0,60)}</p>
            </div>
            <div class=" card " style="width: 18rem;" >
                <img src="${category.strCategoryThumb}" class="card-img-top  m-auto" alt="...">
            <div class="card-body">
                <p class="card-text"></p>
            </div>
            </div>
            </div>
            </div>
            `
        };
        $("#ourContainer").html(categoryContainer);
        $(".categoryCard").on("click", function(){
            let catName = this.getAttribute("id");
            console.log(catName);
            let newCategory = new Details();
            newCategory.getCategoryDetails(catName)
        })
    }
}

