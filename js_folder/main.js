const dom_card = document.querySelector(".football-shoes");
const home_page = document.querySelector('.container')
const form_page = document.querySelector('.form')
const all_products = document.querySelector('#edit-view')
const dom_brand = document.querySelector('.container');
const createButton = document.querySelector("#create01")
//
let formInput = document.querySelector(".form")
let sellerProduct = document.querySelector("#edit-view")
let cart = document.querySelector(".cart")
let cartDiv = document.querySelector(".cart-div")
let cartContainer = document.querySelector(".cart-contaner")
//
let productToEdit = null;

// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
    element.style.display = "none";
  }
  
  function show(element) {
    element.style.display = "block";
}
//show form --------------------------------------------------------
function showForm(){
    formInput.style.display = "block";
    sellerProduct.style.display = "none";
    cart.style.display = "none";
}
//show seller --------------------------------------------------------
function showSellerProduct(){
    sellerProduct.style.display = "block";
    formInput.style.display = "none";
    dom_brand.style.display = "none";
    cart.style.display = "none";
}
function showCart(){
    cartDiv.style.display = "block";
    formInput.style.display = "none";
    dom_brand.style.display = "none";
    sellerProduct.style.display = "none";
}
//  LOCAL STORAGE ---------------------------------------------------------
function saveProduct() {
    localStorage.setItem("products", JSON.stringify(allProducts));
}
function loadProduct() {
    let productStorage = JSON.parse(localStorage.getItem("products"));
    if (productStorage !== null) {
        allProducts = productStorage;
    }
}
//cart save --------------------------------------------------------
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartArray));
}
function loadCart() {
    let productCart = JSON.parse(localStorage.getItem("cart"));
    if (productCart !== null){
        cartArray = productCart
    }
}
//  EDIT ---------------------------------------------------------

function renderProducts() {

    let dom_list = document.querySelector('#product-view');
    dom_list.remove();

    dom_list = document.createElement('div');
    dom_list.id = "product-view"

    all_products.appendChild(dom_list)
    for (let index = 0; index < allProducts.length; index++) {
        let product = allProducts[index];
        
        let container_sell = document.createElement('div');
        container_sell.id = 'card-page-seller';
        container_sell.dataset.index = index;
        dom_list.appendChild(container_sell);
        

        let main_img = document.createElement('img');
        main_img.style.width = '20%'
        main_img.src = product.img;
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
        main_price.textContent = "Price : " + "$" + product.price;
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
        img.addEventListener("click", editProduct)

        let main_links = document.createElement('a');
        // main_link.id = "codepenio"
        main_button.appendChild(main_links);
        
        let imgs = document.createElement('img');
        imgs.src = '../image/trash.png';
        main_links.appendChild(imgs)
        imgs.addEventListener("click", removeProduct)
        
        // container_sells.appendChild(container_sell)

    }
}
function renderProductsCard() {
    console.log('hi')

    let container = document.querySelector('.card-container');
    container.remove();
    container = document.createElement('div');
    container.className = 'card-container';
    dom_card.appendChild(container);

    for(let index = 0; index < allProducts.length; index++){
        let product = allProducts[index];
        
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        container.appendChild(card);
        
        let card_img = document.createElement('img');
        card_img.style.width = "200px"
        card_img.src = product.img;
        card.appendChild(card_img);

        let card_info = document.createElement('div');
        card_info.className = 'card-info';
        card.appendChild(card_info);
    
        let name = document.createElement('h4');
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
        // link1.dataset.index = index;
        link1.addEventListener('click',addCart)
        link1.textContent = 'ADD TO CART'
        card_button.appendChild(link1);
    }

}

//CREATE NEW PRODUCT
let allProducts = []
function onCreate() {
    showSellerProduct()
    
    if (productToEdit !== null) {
        let editProduct = allProducts[productToEdit]
        editProduct.name = document.querySelector('#title').value;
        editProduct.price = document.querySelector('#cost').value;
        editProduct.brand = document.querySelector('#brand').value;
        editProduct.date = document.querySelector('#date').value;
        editProduct.img = document.querySelector('#img').value;
        editProduct.desriptioin = document.querySelector('#desriptioin').value;
    } else {
      let newProduct = {};
      newProduct.name = document.querySelector('#title').value;
      newProduct.price = document.querySelector('#cost').value;
      newProduct.brand = document.querySelector('#brand').value;
      newProduct.date = document.querySelector('#date').value;
      newProduct.img = document.querySelector('#img').value;
      newProduct.desriptioin = document.querySelector('#desriptioin').value;
      if (newProduct.name !== ""
       && newProduct.price !== ""
        && newProduct.brand !== ""
         && newProduct.date !== ""
          && newProduct.img !== ""
           && newProduct.desriptioin){
        allProducts.unshift(newProduct);
      }else{
        alert("Need more information")
      }
    }
  
    // 2- Save question
    saveProduct();
  
    // 3 - Update the view
    renderProducts();
    renderProductsCard();
}
let cartArray = [];
function addCart(event){
    productAddCart = event.target.parentElement.parentElement.dataset.index;

    let addCart = allProducts[productAddCart]
    cartArray.unshift(addCart);
    saveCart();
    rederCart();
}
function rederCart(){
    // console.log("rom")

    let cart = document.querySelector(".cart");
    let container = document.querySelector(".cart-contaner");
    container.remove();
    container = document.createElement("div");
    container.className = "cart-contaner";
    cart.appendChild(container);

    for (let index = 0; index < cartArray.length; index++) {
        let cartProdeuct = cartArray[index]

        let cartCard = document.createElement("div")
        cartCard.className = "cart-card";
        container.appendChild(cartCard)

        let cartTop = document.createElement("div");
        cartTop.className = "cart-card-top";
        cartCard.appendChild(cartTop);

        let cartImg = document.createElement("img");
        cartImg.src = cartProdeuct.img
        cartImg.style.width = "60px"
        cartTop.appendChild(cartImg)

        let cartName = document.createElement("h4");
        cartName.textContent = cartProdeuct.name;
        cartTop.appendChild(cartName);

        let cartPrice = document.createElement("h5");
        cartPrice.textContent = cartProdeuct.price;
        cartTop.appendChild(cartPrice);

        let cartbotton = document.createElement("div");
        cartbotton.className = "cart-card-button";
        cartCard.appendChild(cartbotton)

        let number = document.createElement("input")
        number.type = "number"
        number.value = "1"
        cartbotton.appendChild(number)
    }
}
function editProduct(event) {
    //  Get the question index
    productToEdit = event.target.parentElement.parentElement.parentElement.dataset.index;
    // update the dialog with question informatin
    let product = allProducts[productToEdit];
    document.querySelector('#title').value = product.name;
    document.querySelector('#cost').value = product.cost;
    document.querySelector('#brand').value = product.brand;
    document.querySelector('#date').value = product.date ;
    document.querySelector('#img').value = product.img;
    document.querySelector('#desriptioin').value = product.desriptioin;
  
    // Show the dialog
    createButton.textContent = "EDIT YOUR PRODUCT";
    showForm()
}  

function removeProduct(event) {
    //  Get index
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
  
    // Remove question
    allProducts.splice(index, 1);
  
    // Save to local storage
    saveProduct();
  
    // Update the view
    renderProducts();
    renderProductsCard();
}
function searchProduct(){
    let searchInput = document.querySelector("#search-box");
    let seachInputUpper = searchInput.value.toUpperCase();
    let Prosuct = document.querySelector(".card-container")
    let cardProduct = document.querySelectorAll(".card")
    for (index = 0 ; cardProduct.length; index++){
        let name = cardProduct[index].querySelector("#name");
        let nameValue = name.textContent || name.innerText;
        if (nameValue.toUpperCase().indexOf(seachInputUpper) > -1){
            cardProduct[index].style.display = "block";
        }else {
            cardProduct[index].style.display = "none";
        }
    }
}
function onCancel(event){
    showSellerProduct()
}
loadProduct()
loadCart()
renderProducts()
renderProductsCard();