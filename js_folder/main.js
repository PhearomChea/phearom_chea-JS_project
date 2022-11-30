const dom_card = document.querySelector(".football-shoes");
const home_page = document.querySelector('.container')
const form_page = document.querySelector('.testbox')
//get item from form input -------------------------------------------------------------------------------
let products = []
function create(){
    let new_product = {}
    new_product.name = document.querySelector('#name').value;
    new_product.price = document.querySelector('#price').value;
    new_product.brand = document.querySelector('#brand').value;
    new_product.date = document.querySelector('#date').value;
    new_product.img = document.querySelector('#img').value;
    new_product.desriptioin = document.querySelector('#desriptioin').value;
    if(
        new_product.name !== "" &&
        new_product.price !== "" &&
        new_product.brand !== "" &&
        new_product.date !== "" &&
        new_product.img !== "" &&
        new_product.desriptioin !== ""
    ){
        products.push(new_product)
        saveProduct()
    }
    onCreateProduct()
}
//hide home page and show form------------------------------------------------------------------------------------------------
function showform(){
    hide(home_page);
    show(form_page);
}
//hide form page and show home------------------------------------------------------------------------------------------------
function showhome(){
    hide(form_page);
    show(home_page);
}
// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
    element.style.display = "none";
}
  
  function show(element) {
    element.style.display = "block";
}
//saveProduct to localStorage------------------------------------------------------------------------------------------------
function saveProduct(){
    localStorage.setItem('products', JSON.stringify(products));
}
function loadProduct(){
    let pro = JSON.parse(localStorage.getItem('products'));
    if (pro !== null){
        products = pro
    }
}
//create products-----------------------------------------------------------------------------------------------------
// function onCreateProduct(){
//     loadProduct()
//     //remove comtainer
//     let container = document.querySelector('.card-container');
//     container.remove();
//     container = document.createElement('div');
//     container.className = 'card-container';
//     dom_card.appendChild(container);

//     for(let index = 0; index < products.length; index++){
//         let product = products[index];

        
//         let card = document.createElement('div');
//         card.className = 'card';
//         container.appendChild(card);
        
//         let card_img = document.createElement('img');
//         card_img.src = '../image/football-shoes.png';
//         card.appendChild(card_img);

//         let card_info = document.createElement('div');
//         card_info.className = 'card-info';
//         card.appendChild(card_info);
    
//         let name = document.createElement('h4');
//         name.id = 'name';
//         name.textContent = product.name;
//         card_info.appendChild(name);
    
//         let price = document.createElement('h6');
//         price.id = 'price';
//         price.textContent = product.price;
//         card_info.appendChild(price);
    
//         let link = document.createElement('a');
//         link.textContent = 'Buy Now'
//         card.appendChild(link);
//     }
//     showhome()
// }
onCreateProduct()