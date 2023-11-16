let ITEMS = [
    {
        id:1,
        name:'Product 1',
        price:1028,
        image:'https://imageio.forbes.com/specials-images/imageserve/63fa34abd4092acbb40f01bf/Apple--iPhone-15--iPhone-15-Pro--iPhone-15-Pro-Max--iPhone-15-colors--iPhone-15-Pro/0x0.jpg?crop=891,1055,x245,y0,safe&height=841&width=711&fit=bounds',
        qty:1,
    },
    {
        id:2,
        name:'Product 1',
        price:1028,
        image:'https://imageio.forbes.com/specials-images/imageserve/63fa34abd4092acbb40f01bf/Apple--iPhone-15--iPhone-15-Pro--iPhone-15-Pro-Max--iPhone-15-colors--iPhone-15-Pro/0x0.jpg?crop=891,1055,x245,y0,safe&height=841&width=711&fit=bounds',
        qty:1,
    },
    {
        id:3,
        name:'Product 1',
        price:1028,
        image:'https://imageio.forbes.com/specials-images/imageserve/63fa34abd4092acbb40f01bf/Apple--iPhone-15--iPhone-15-Pro--iPhone-15-Pro-Max--iPhone-15-colors--iPhone-15-Pro/0x0.jpg?crop=891,1055,x245,y0,safe&height=841&width=711&fit=bounds',
        qty:1,
    },
    {
        id:4,
        name:'Product 1',
        price:1028,
        image:'https://imageio.forbes.com/specials-images/imageserve/63fa34abd4092acbb40f01bf/Apple--iPhone-15--iPhone-15-Pro--iPhone-15-Pro-Max--iPhone-15-colors--iPhone-15-Pro/0x0.jpg?crop=891,1055,x245,y0,safe&height=841&width=711&fit=bounds',
        qty:1,
    },
]
const openBtn = document.getElementById('open_cart_btn')
const cart = document.querySelector('.sideCart')
const closeBtn = document.getElementById('close_btn')
const backdrop = document.querySelector('.backdrop')
const itemsEl = document.querySelector('.items')
const cartItems = document.querySelector('.cart_items')
const itemNumber = document.getElementById('items_num')
const subtotalPrice = document.getElementById('subtotal_price')
openBtn.addEventListener('click' , openCart)
closeBtn.addEventListener('click' ,  closeCart)
function openCart(){
    cart.classList.add('open')
    backdrop.style.display = 'block'
    setTimeout(()=>{
        backdrop.classList.add('show')
    } , 0)
   
}
readerItems()
function closeCart(){
    cart.classList.remove('open')
    backdrop.classList.remove('show')
    setTimeout(() => {
        backdrop.style.display = 'none'
    },500)
}
function calculateSubtotalPrice() {
    let subtotal = 0
    cart_data.forEach((item) => (subtotal += item.price * item.qty));
    subtotalPrice.innerText = subtotal
}
function readerItems(){
    ITEMS.forEach((item , idx) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('item')
        itemEl.onclick = () => addItem(idx , item.id)
        itemEl.innerHTML = ` 
            <img src = '${item.image}'>
            <button>Add to Cart</button>
        `
        itemsEl.appendChild(itemEl)
    })
}
let cart_data = [
    // your cart data here
    // {
    //     id:1,
    //     name:'Product 1',
    //     price:1028,
    //     image:'https://imageio.forbes.com/specials-images/imageserve/63fa34abd4092acbb40f01bf/Apple--iPhone-15--iPhone-15-Pro--iPhone-15-Pro-Max--iPhone-15-colors--iPhone-15-Pro/0x0.jpg?crop=891,1055,x245,y0,safe&height=841&width=711&fit=bounds',
    //     qty:1,
    // },
];
readCartItems();
function readCartItems(){
    // remove everything from cart
    cartItems.innerHTML = ''
    // add new data
    cart_data.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item')
        cartItem.innerHTML = `
        <div class="remove_item" onclick="removeCartItem(${item.id})">
                        <span>&times;</span>
                    </div>
                    <div class="item_img">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="item_details">
                        <p>${item.name}</p>
                        <strong>$${item.price}</strong>
                        <div class="qty">
                            <span onclick ="discreaseQty(${item.id})">-</span>
                            <strong>${item.qty}</strong>
                            <span onclick = "increaseQty(${item.id})">+</span>
                        </div>
                    </div>
        `
        cartItems.appendChild(cartItem)
    })
}
// Add Item to cart
function addItem(idx , itemid){
    // find same item
    const foundItem = cart_data.find(
        (item) => item.id.toString() == itemid.toString()
    )
    if(foundItem){
        increaseQty(itemid)
    }
    else {
        cart_data.push(ITEMS[idx])
    }
    // cart_data.push(ITEMS[idx])
    updateCart();  
    openCart();
}
// Remove Cart item
function removeCartItem(itemid){
    cart_data = cart_data.filter((item)=> item.id != itemid);
    updateCart()
}
// Increase Qty
function increaseQty(itemid){
    cart_data =  cart_data.map((item) => 
        item.id.toString() === itemid.toString()
        ? {...item , qty: item.qty + 1}
        : item
    )
    updateCart();
}
// Calculate Item number
function calcItemNum(){
    let itemCount = 0 ;
    cart_data.forEach((item) => (itemCount += item.qty))
    itemNumber.innerText = itemCount;
}
function discreaseQty(itemid){
    cart_data =  cart_data.map((item) => 
        item.id.toString() === itemid.toString()
        ? {...item , qty: item.qty > 1 ? item.qty - 1: item.qty}
        : item
    )
    updateCart();
}


function updateCart(){
    // renranCar cart items with update data
    readCartItems();
    // Update Items Number in Cart
    calcItemNum();
    // Update Subtotal Price
    calculateSubtotalPrice();
}
