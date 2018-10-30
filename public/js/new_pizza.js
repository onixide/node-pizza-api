const sizesArr = []
const inputs = document.querySelectorAll(".sizes input");
const sizesResults = document.querySelectorAll(".sizes-result");

document.querySelector(".new-size").addEventListener("click", (e) => {
    e.preventDefault();
   
    inputsValidation();

    updateSizesArray();
    


    inputs.forEach((input) => input.value = "");



    console.log(sizesArr);
});

function updateSizesArray(){

    sizesArr.push({ 
        size_name: inputs[0].value,
        diameter : inputs[1].value,
        price : inputs[2].value
    });

}

function inputsValidation(){

    inputs.forEach( (val, index) => {
        if (val.value === ""){
            console.log("znaleziono puisty");
            return false;

        }})

        console.log("po eachy")
}