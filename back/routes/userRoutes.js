const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')




//Rutas para registrar un nuevo usuario


router.post('/register',async(req,res)=>{
    const {username,password}=req.body
    try{
        const existingUser = await User.findOne ({username})
        if(existingUser){
            return res.status(400).send('El usuario ya existe')
        }
        const  hashedPassword = await bcrypt.hash(password, 10 )
        const newUser = new User({username, password:hashedPassword})
        await newUser.save()
        res.status(201).send("Usuario registrado con éxito");
    }catch (err){
        console.error('Error al registrar el usuario ',err)
    }
})



// ruta para iniciar sesion
router.post('/login', async(req,res)=>{
    const {username,password}=req.body
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).send('Usuario no encotrado')
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            console.error('Contraseña incorrecta para el usuario',username)
            return  res.status(401).send('contraseña incorrecta')
        }
        req.session.user = user.username
        res.send(`Usuario ${user.username} ha iniciado sesion`)
    }catch(err){
        res.status(500).send('Error en el servidor')
    }
})


// ruta para cerrar sesion


router.get('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(err){
            return res.send(500).send('Error al cerrar session')
        }
        res.send('Sesion cerrada')
    })
})






module.exports= router