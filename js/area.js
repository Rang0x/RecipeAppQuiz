import { Details } from "./details.js";

export class Area {
    constructor(){
        this.getArea();
    }
    async getArea(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        let areas = await response.json();
        let areaData = areas.meals;
        this.displayArea(areaData);
    }
    displayArea(areaData){
            let areaContainer = '';
            for (let i = 0; i < areaData.length; i++) {
                let area = areaData[i];
                areaContainer += `
                <div class="text-white col-md-3 areaCard p-5" id="${area.strArea}">
                    <div class="cardHover position-relative overflow-hidden">
                        <div class=" d-flex flex-column justify-content-center align-items-center">
                            <i class="fa-solid fa-location-crosshairs fs-1 mb-2"></i>
                            <h3>${area.strArea}</h3>
                        </div>
                    </div>
                </div>
                `
            };
            $("#ourContainer").html(areaContainer);
            $(".areaCard").on("click", function(){
                let areaName = this.getAttribute("id");
                let newArea = new Details();
                newArea.getAreaDetails(areaName)
            })
    }
}