"use strict";
const inputs = document.querySelectorAll(".sizes input");
const sizesResults = document.querySelector(".sizes-result");

document.querySelector(".new-size").addEventListener("click", (e) => {
    e.preventDefault();

    let ul = document.createElement("ul");
    let liSet = `<li>${inputs[0].value}</li>
                <li>${inputs[1].value}</li>
                <li>${inputs[2].value}</li>`
    ul.innerHTML = liSet;

    console.log(ul);
    sizesResults.appendChild(ul);

    inputs.forEach((input) => input.value = "");
   
});

function collectSizes(){
    const sizesArr = []
    let sizesSets = sizesResults.querySelectorAll("ul");
    console.log(sizesSets);

    sizesSets.forEach((sizes, index) => {
        sizesArr.push({
           name: sizes.children[0].textContent,
           size: sizes.children[1].textContent,
           price: sizes.children[2].textContent
        })
    })
    console.log(sizesArr);
    return sizesArr;

}

function addlyNewPizza() {
    let dataArr = collectSizes();
    var url = '/orders/pizza';
    var data = { "size_price": dataArr };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(res)
        }
    })
    .then((res) => {console.log('Success:', JSON.stringify(res));
        console.log(res);
    })
    .catch(error => console.error('Error:', error.status));

}

document.querySelector(".new-pizza").addEventListener("click", addlyNewPizza);