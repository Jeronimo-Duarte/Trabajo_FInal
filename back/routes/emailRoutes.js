const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); 
const router = express.Router();

const usuarioEthereal= 'maxine.harris@ethereal.email';
const contraseñaEthereal = 'sEWpPrqtTxbzDMcSg5';
router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Configurar el transportador
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // Usar `true` si usas el puerto 465
            auth: {
                user: usuarioEthereal,
                pass: contraseñaEthereal,
            },
        });

     
        const mailToEthereal = {
            from: `"Formulario de contacto" <${usuarioEthereal}>`,
            to: usuarioEthereal, 
            subject: `Nuevo mensaje de ${name}`,
            text: `Has recibido un nuevo mensaje de tu formulario de contacto:\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
        };

        // Correo 2: Respuesta automática al correo proporcionado
        const mailToUser = {
            from: `"Soporte" <${usuarioEthereal}>`,
            to: email, // Correo ingresado en el formulario
            subject: 'Hemos recibido tu mensaje',
            text: `Hola ${name},\n\nGracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.\n\nSaludos,\nEl equipo de soporte.`,
        };

        // Enviar ambos correos
        await transporter.sendMail(mailToEthereal);
        await transporter.sendMail(mailToUser);

        res.status(200).json({ message: 'Correos enviados exitosamente' });
    } catch (error) {
        console.error('Error al enviar los correos:', error);
        res.status(500).json({ error: 'Error al enviar los correos' });
    }
});

module.exports= router


  
  
  
  
  
  
  

