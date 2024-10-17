const express = require('express');
const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
 
function addTocart(cart, productId, name, price, quantity) {
  let product = {
    productId,
    name,
    price,
    quantity
  };
  cart.push(product);
  return cart;
}

app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addTocart(cart, productId, name, price, quantity);
  res.json(result);
});

function updateQuantityOfProduct(cart, productId, quantity){
  for(let i=0; i<cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

app.get("/cart/edit", (req, res)=>{
  let productId= parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantityOfProduct(cart, productId, quantity);
  cart = result;
  res.json(result);
});

function deleteProduct(cart, productId){
  return cart.productId !== productId;
}

app.get("/cart/delete", (req, res)=>{
  let productId = parseInt(req.query.productId);
  let result = cart.filter(cart => deleteProduct(cart, productId));
  cart = result;
  res.json(result);
})

app.get("/cart", (req, res)=>{
  res.json({ cartItems:cart});
})

function calculateTotalQuantity(cart){
  sum=0;
  for(let i=0; i<cart.length; i++){
    sum = sum + cart[i].quantity;
  }
  return sum;
}

app.get("/cart/total-quantity", (req, res)=>{
  let total = calculateTotalQuantity(cart);
  res.json({totalQuantity:total});
});

function calculateTotalPrice(cart){
  let sum=0;
  for(let i=0; i<cart.length;i++){
    sum = sum + cart[i].price;
  }
  return sum;
}

app.get("/cart/total-price", (req, res)=>{
  let price = calculateTotalPrice(cart);
  res.json({totalprice:price});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
