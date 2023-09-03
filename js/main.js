import { Recipes } from "./recipe.js";
import { Category } from "./categories.js";
import { Ingredient } from "./ingredient.js";
import { Area } from "./area.js";
import { Search } from "./search.js";

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
let submitBtn = $("#submitBtn");


// Loading Screen
function loading(){
    $(".loader").fadeOut(1000, function(){
        $(".screenLoading").fadeOut(500, function(){
            $("body").css('overflow', 'auto')
        })
    })
}
$(document).ready(setInterval(loading , 3000))


// Reload 
$("#logo").on("click", function(){
    location.reload();
})

let recipes = new Recipes;
recipes.getRecipe();

// Card overlays 
$('#card').hover(function(){$('#cardOverlay').toggleClass("top-100", 2000)})

// Fire each feature
$("#category").on("click", function(){
    let cat = new Category;
})
$("#ingredient").on("click", function(){
    let ing = new Ingredient();
})
$("#area").on("click", function(){
    let area = new Area();
})
$("#search").on("click", function(){
    $("#ourContainer").html(`<div class="container d-flex justify-content-center mt-4">
        <input id="sByName" type="text" placeholder="Search by name" class="form-control w-50 me-3">
        <input id="sByFirstLetter" type="text" placeholder="Search by first letter" maxlength="1" class="form-control w-50">
    </div>`);
    $("#sByName").on("keyup", function(){
        let name = this.value;
        let newName = new Search(name);
        newName.getRecipesByName(name);
    })
    $("#sByFirstLetter").on("keyup", function(){
        let letter = this.value;
        let newLetter = new Search("",letter);
        newLetter.getRecipesByLetter(letter);
    })
})
$("#contact").on("click", function(){
    $("#ourContainer").html(`
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Email not valid *anything@xyz.com
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid age
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Password Don't match
                        </div>
                    </div>
                </div>
                <button id="submitBtn" disabled="true" class="btn btn-outline-primary px-2 mt-3">Submit</button>
            </div>
        </div>
    `)
    
})

// SideBar Hide
let sideBarWidth = $("#sideMenu").innerWidth();
$("#sideNav").css("left", -sideBarWidth)

// SideBar toggle on link click
$(".menu li a").on("click", toggle)
$("#close").on("click", toggle)
function toggle(){
    if($("#sideNav").css("left") == "0px"){
        $("#sideNav").animate( {left: -sideBarWidth} , 500);
        $("#close").toggleClass("fa-xmark", "fa-bars");
        $(".menu a").css("top", "300px")
    }
    else{
        $("#sideNav").animate( {left: 0} , 500);
        $("#close").toggleClass("fa-xmark", "fa-bars");
        for (let i = 0; i < 5; i++) {
            $(".menu a").eq(i).animate({
                top: 0
            }, (i + 2) * 100)
        }
    }
}


$("#nameInput").keyup(inputsValidation())
$("#emailInput").keyup(inputsValidation())
$("#phoneInput").keyup(inputsValidation())
$("#ageInput").keyup(inputsValidation())
$("#passwordInput").keyup(inputsValidation())
$("#repasswordInput").keyup(inputsValidation())



$("#nameInput").on("focus", () => {
    nameInputTouched = true
})
$("#emailInput").on("focus", () => {
    emailInputTouched = true
})
$("#phoneInput").on("focus", () => {
    phoneInputTouched = true
})
$("#ageInput").on("focus", () => {
    ageInputTouched = true
})
$("#passwordInput").on("focus", () => {
    passwordInputTouched = true
})
$("#repasswordInput").on("focus", () => {
    repasswordInputTouched = true
})



function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            $("#nameAlert").classList.replace("d-block", "d-none")

        } else {
            $("#nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            $("#emailAlert").classList.replace("d-block", "d-none")
        } else {
            $("#emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            $("#phoneAlert").classList.replace("d-block", "d-none")
        } else {
            $("#phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            $("#ageAlert").classList.replace("d-block", "d-none")
        } else {
            $("#ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            $("#passwordAlert").classList.replace("d-block", "d-none")
        } else {
            $("#passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            $("#repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            $("#repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.attr("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test($("#nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($("#phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").value))
}

function repasswordValidation() {
    return $("#repasswordInput").value == $("#passwordInput").value
}