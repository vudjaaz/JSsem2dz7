//ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ В LOCAL STORAGE по клику на кнопку "Add to Cart"
const addButtonEls = document.querySelectorAll('.products__add__flex');
addButtonEls.forEach(addButtonEl => {
    addButtonEl.addEventListener('click', (e) => {
        const productToAdd = {
            title: addButtonEl.parentElement.parentElement.querySelector('.products__item__name').textContent,
            imgPath: addButtonEl.parentElement.parentElement.querySelector('.products__item__image').src,
            price: Number(addButtonEl.parentElement.parentElement.querySelector('.products__item__price').textContent.slice(1)),
        }
        const nameOfItemToAdd = `productInCart${localStorage.length + 1}`;
        localStorage.setItem(nameOfItemToAdd, JSON.stringify(productToAdd));
    });
});

//ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ ИЗ LOCAL STORAGE в корзину на отдельной странице сайта Shopping Cart
const productsinCart = document.querySelector('.sh__cart__table');
for (let i = 0; i < localStorage.length; i++) {
    productsinCart.insertAdjacentHTML('beforeend', `
        <div class="sh__cart__table__productLine">
            <div class="sh__cart__table__productDetails">
                <a class="sh__cart__table__productImg" href="single_page.html">
                    <img class="sh__cart__table__productImgPath" src=${JSON.parse(localStorage.getItem(localStorage.key(i))).imgPath} alt="">
                </a>
                    <div class="sh__cart__table__productText">
                        <h3 class="sh__cart__table__productName">${JSON.parse(localStorage.getItem(localStorage.key(i))).title}</h3>
                        <span class="sh__cart__table__productColorSize">Color: <span
                                        class="sh__cart__table__productColorSize__data">Red</span><br>
                                    Size: <span class="sh__cart__table__productColorSize__data">Xll</span></span>
                     </div>
                        </div>
                        <span class="sh__cart__table__productPrice">$${JSON.parse(localStorage.getItem(localStorage.key(i))).price}</span>
                        <input class="sh__cart__table__inputField" type="number" name="" id="" value="1" min="1">
                        <span class="sh__cart__table__productShipping">FREE</span>
                        <span class="sh__cart__table__productSubtotal">$${JSON.parse(localStorage.getItem(localStorage.key(i))).price}</span>
                        <a class="sh__cart__table__productAction" href="#"><img src="img/remove_icon.png"
                                alt="крестик-удалить"></a>
            </div>`);
}

//ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ ИЗ LOCAL STORAGE в корзину в мини-окне (появляется при наведении на значок корзины в хедере на странице сайта Shopping Cart)
const cartBoxEl = document.querySelector('.cartBox');
const productsinCartMini = cartBoxEl.querySelector('.mega-item');
for (let i = 0; i < localStorage.length; i++) {
    productsinCartMini.insertAdjacentHTML('afterbegin', `
<a class="cartBox__shiftToItem" href="single_page.html">
<div class="cartBox__product">
    <div class="cartBox__productImg"><img class="cartBox__productImage"src=${JSON.parse(localStorage.getItem(localStorage.key(i))).imgPath} alt=""></div>
    <div class="cartBox__productDescription">
        <h3 class="cartBox__itemName">${JSON.parse(localStorage.getItem(localStorage.key(i))).title}</h3>
        <img src="img/cartStars.png" alt="">
        <span class="cartBox__itemPrice">1 <span
                class="products__itemPrice_x">x</span>
                $${JSON.parse(localStorage.getItem(localStorage.key(i))).price}</span>
    </div>
</div>
</a>`
    );
}

//ПОДСЧЕТ СУММЫ ПОКУПОК В ТОТАЛЕ в мини-окне и на розовой табличке на странице Shopping Cart
let totalAmountValue = 0;
for (let i = 0; i < localStorage.length; i++) {
    // totalAmountValue += JSON.parse(localStorage.getItem(localStorage.key(i))).price;
    totalAmountValue += JSON.parse(localStorage.getItem(localStorage.key(i))).price;
}
const grandTotalVal = document.querySelector('.sh__cart__orderForm__price_colored');
grandTotalVal.textContent = `$${totalAmountValue}`;
const totalSumMiniCart = document.querySelector('.cartBox__totalSumVal');
totalSumMiniCart.textContent = `$${totalAmountValue}`;

//УДАЛЕНИЕ ИЗ LOCAL STORAGE И КОРЗИНЫ ПО НАЖАТИЮ НА КРЕСТИК
const removeIconEls = document.querySelectorAll('.sh__cart__table__productAction');
removeIconEls.forEach(removeIcon => {
    removeIcon.addEventListener('click', (e) => {
        const thisProductImgPath = e.currentTarget.parentElement.querySelector('.sh__cart__table__productImgPath').src;
        for (let i = 0; i < localStorage.length; i++) {
            if (JSON.parse(localStorage.getItem(localStorage.key(i))).imgPath === e.target.parentElement.parentElement.querySelector('.sh__cart__table__productImgPath').src) {
                localStorage.removeItem(localStorage.key(i));
                productsinCart.remove(e.currentTarget.parentElement);
                location.reload();
                // productsinCartMini.remove(e.currentTarget.parentElement);
            }

        }
    });
});






