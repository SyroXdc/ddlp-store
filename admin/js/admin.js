
async function loadProducts(){

const res=await fetch('http://localhost:3000/products')
const data=await res.json()

const el=document.getElementById('productList')
el.innerHTML=''

data.forEach((p,i)=>{

el.innerHTML+=`
<div>
${p.name} - Rp${p.price}
<button onclick="deleteProduct(${i})">hapus</button>
</div>
`

})

}

async function addProduct(){

await fetch('http://localhost:3000/products',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
name:name.value,
price:price.value,
stock:stock.value
})
})

loadProducts()

}

async function deleteProduct(i){

await fetch('http://localhost:3000/products/'+i,{method:'DELETE'})

loadProducts()

}

async function addPayment(){

await fetch('http://localhost:3000/payments',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
name:payname.value,
number:paynumber.value
})
})

}

loadProducts()
