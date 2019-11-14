'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()


//OJO!!! SOLO LA ÚLTIMA RUTA api.get TIENE el parámetro AUTH. 
//Para ver esa ruta, hay que estar autentificado y tener acceso.
//Por lo tanto, si ponemos ese parámetro en las demás rutas, para acceder a su
//respectivo contenido, el usuario deberá estar también AUTENTIFICADO Y 
//TENER ACCESO A ESAS FUNCIONALIDADES, O DE LO CONTRARIO DARÁ ERROR.
api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api