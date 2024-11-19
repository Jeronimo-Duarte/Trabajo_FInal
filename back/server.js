const express =require("express")
const app = express() 
const path = require('path');
require("dotenv").config()
const cors = require("cors")
const productosRouter = require('./routes/productosRoutes.js')
/* const session = require('express-session')
const userRouter = require('./routes/userRoutes') */
const  mongoose = require("mongoose")

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use("/api/productos",productosRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Conectado a la MongoDB"))
.catch(err => console.error('Error al conectar a MongoDB',err))


const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`Servidor escuchando el puerto ${PORT}`)
})