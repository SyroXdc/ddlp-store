
let products=[]
let cart=[]

async function loadProducts(){
const res=await fetch('http://localhost:3000/products')
products=await res.json()
renderProducts()
}

async function loadPayments(){
const res=await fetch('http://localhost:3000/payments')
const data=await res.json()

const select=document.getElementById('paymentSelect')
select.innerHTML=''

data.forEach(p=>{
select.innerHTML+=`<option>${p.name} (${p.number})</option>`
})
}

function renderProducts(){

const el=document.getElementById('products')
el.innerHTML=''

products.forEach((p,i)=>{

el.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>Rp ${p.price}</p>
<p>Stock ${p.stock}</p>
<button onclick="addCart(${i})">Tambah</button>
</div>
`

})

}

function addCart(i){

if(products[i].stock<=0){
alert("stok habis")
return
}

cart.push(products[i])
renderCart()

}

function renderCart(){

const el=document.getElementById('cartItems')
el.innerHTML=''

cart.forEach(p=>{
el.innerHTML+=`<div>${p.name} - Rp${p.price}</div>`
})

}

async function checkout(){

const payment=document.getElementById('paymentSelect').value

let text="Order DDLP STORE:%0A"

cart.forEach(p=>{
text+=`${p.name} - Rp${p.price}%0A`
})

text+=`%0APayment: ${payment}`

const res=await fetch('http://localhost:3000/contact')
const data=await res.json()

window.open(`https://wa.me/${data.whatsapp}?text=${text}`)

}

function showPage(page){

document.getElementById('shop').style.display='none'
document.getElementById('cart').style.display='none'

document.getElementById(page).style.display='block'

}

function goAdmin(){

window.location.href="../admin/admin.html"

}

loadProducts()
loadPayments()
