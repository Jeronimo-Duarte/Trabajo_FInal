const express =require("express")
const app = express() 
const path = require('path');
require("dotenv").config()
const cors = require("cors")
const productosRouter = require('./routes/productosRoutes.js')
const session = require('express-session')
const userRouter = require('./routes/userRoutes') 
const  mongoose = require("mongoose")
const emailRouter = require('./routes/emailRoutes.js')

app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized :true,
    cookie:{secure:false}
}))
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use("/api/productos",productosRouter)
app.use("/api/users",userRouter)
app.use("/",emailRouter)


mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Conectado a la MongoDB"))
.catch(err => console.error('Error al conectar a MongoDB',err))


const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`Servidor escuchando el puerto ${PORT}`)
})