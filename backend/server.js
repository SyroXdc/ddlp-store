
const express=require('express')
const cors=require('cors')
const fs=require('fs')

const app=express()

app.use(cors())
app.use(express.json())

function read(file){
return JSON.parse(fs.readFileSync(file))
}

function write(file,data){
fs.writeFileSync(file,JSON.stringify(data,null,2))
}

app.get('/products',(req,res)=>{
res.json(read('./data/products.json'))
})

app.post('/products',(req,res)=>{

let data=read('./data/products.json')

data.push(req.body)

write('./data/products.json',data)

res.json({status:'ok'})

})

app.delete('/products/:id',(req,res)=>{

let data=read('./data/products.json')

data.splice(req.params.id,1)

write('./data/products.json',data)

res.json({status:'deleted'})

})

app.get('/payments',(req,res)=>{
res.json(read('./data/payments.json'))
})

app.post('/payments',(req,res)=>{

let data=read('./data/payments.json')

data.push(req.body)

write('./data/payments.json',data)

res.json({status:'ok'})

})

app.get('/contact',(req,res)=>{
res.json(read('./data/contact.json'))
})

app.listen(3000,()=>{

console.log("DDLP STORE API RUNNING")

})
