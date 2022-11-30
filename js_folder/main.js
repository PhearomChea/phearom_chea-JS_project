const dom_card = document.querySelector(".football-shoes");
const home_page = document.querySelector('.container')
const form_page = document.querySelector('.form')
const all_products = document.querySelector('#edit-view')
const dom_list = document.querySelector('#product-view');
//get item from form input -------------------------------------------------------------------------------
let products_all = []
function create(){
    document.querySelector('#create01').textContent = "PUT YOUR PRODUCT"
    let new_product = {}
    new_product.name = document.querySelector('#title').value;
    new_product.price = document.querySelector('#cost').value;
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
        products_all.unshift(new_product)
        saveProduct()
        console.log('HI')
    }
    cardProduct()
    sellList()
    seller_product()
}
function cancel() {
    // TODO : when clicking on ADD button, hide the dialog
    seller_product()
  }
//hide home page and hide form show seller product------------------------------------------------------------------------------------------------
function seller_product(){
    hide(home_page);
    hide(form_page);
    show(all_products);
}
//hide home page and show form------------------------------------------------------------------------------------------------
function show_form(){
    hide(home_page);
    hide(all_products);
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
    localStorage.setItem('products', JSON.stringify(products_all));
    console.log('save')
}
//get value from localStorage----------------------------------------------------------------
function loadProduct(){
    let pro = JSON.parse(localStorage.getItem('products'));
    if (pro !== null){
        products_all = pro
    }
}
//create products-----------------------------------------------------------------------------------------------------
function cardProduct(){

    let container = document.querySelector('.card-container');
    container.remove();
    container = document.createElement('div');
    container.className = 'card-container';
    dom_card.appendChild(container);

    for(let index = 0; index < products_all.length; index++){
        let product = products_all[index];
        
        let card = document.createElement('div');
        card.className = 'card';
        container.appendChild(card);
        
        let card_img = document.createElement('img');
        card_img.src = '../image/football-shoes.png';
        card.appendChild(card_img);

        let card_info = document.createElement('div');
        card_info.className = 'card-info';
        card.appendChild(card_info);
    
        let name = document.createElement('h3');
        name.id = 'name';
        name.textContent = product.name;
        card_info.appendChild(name);


        let card_price = document.createElement('div');
        card_price.className = 'card-price';
        card_info.appendChild(card_price);

        let price_cont = document.createElement('h6');
        price_cont.textContent = "Price : "+"$"+product.price;
        card_price.appendChild(price_cont);

        let price = document.createElement('h6');
        price.id = 'price';
        price.textContent = "Date :" + product.date;
        card_price.appendChild(price);

        let card_button = document.createElement('div');
        card_button.className = 'card-button';
        card.appendChild(card_button);

        let link = document.createElement('a');
        link.style.cursor = 'pointer'
        link.textContent = 'Buy Now'
        card_button.appendChild(link);

        let link1 = document.createElement('a');
        link1.style.cursor = 'pointer'
        link1.textContent = 'See More'
        card_button.appendChild(link1);
    }

}

function sellList() {
    let container_sell = document.querySelector('#card-page-seller');
    container_sell.remove();

    for(let index = 0; index < products_all.length; index++){
        let product = products_all[index];
        
        container_sell = document.createElement('div');
        container_sell.id = 'card-page-seller';
        dom_list.appendChild(container_sell);
        
        let main_img = document.createElement('img');
        main_img.style.width = '20%'
        main_img.src = '../image/football-shoes.png';
        container_sell.appendChild(main_img);

        let main_info = document.createElement('div');
        main_info.id = 'cart-info';
        container_sell.appendChild(main_info);
    
        let main_name = document.createElement('h2');
        main_name.id = 'name-info';
        main_name.textContent = product.name;
        main_info.appendChild(main_name);

        let main_price = document.createElement('h3');
        main_price.id = 'price-info';
        main_price.textContent = "Price : "+"$"+product.price;
        main_info.appendChild(main_price);

        let main_date = document.createElement('h5');
        main_date.id = 'date-info';
        main_date.textContent = "Date :" + product.date;
        main_info.appendChild(main_date);

        let para = document.createElement('p');
        para.textContent = product.desriptioin
        main_info.appendChild(para);

        let main_button = document.createElement('div');
        main_button.id = 'link-info';
        container_sell.appendChild(main_button);

        let main_link = document.createElement('a');
        // main_link.id = "codepenio"
        main_button.appendChild(main_link);
        
        let img = document.createElement('img');
        img.src = '../image/edit.png';
        main_link.appendChild(img)

        let main_links = document.createElement('a');
        // main_links.id = "codepenio"
        main_button.appendChild(main_links);
        img.addEventListener('click', editProduct)

        let imgs = document.createElement('img');
        imgs.src = '../image/trash.png';
        imgs.style.cursor = 'pointer';
        main_links.appendChild(imgs)
        imgs.addEventListener('click',removeProduct)

    }

}

function editProduct(event) {
    let index = event.target.parentElement.parentElement.dataset.index
    show_form()
    let editProduct = products_all[index]
    document.querySelector('#create01').textContent = "EDIT PRODUCT"
    document.querySelector('#title').value = editProduct.name;
    document.querySelector('#cost').value = editProduct.price;
    document.querySelector('#brand').value= editProduct.brand;
    document.querySelector('#date').value= editProduct.date;
    document.querySelector('#img').value= editProduct.img;
    document.querySelector('#desriptioin').value = editProduct.desriptioin;
    products_all.splice(index,1)
    // saveProduct()
}

function removeProduct(event) {
    let index = event.target.parentElement.parentElement.dataset.index
    products_all.splice(index,1)
    saveProduct()
    // sellList()
    // cardProduct()
    // create()
}
loadProduct()
cardProduct()
sellList()
//display all products------------------------------------------------------------------------------------------------

  