'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

//Funciones que proporciona mongoose, que pueden ejecutarse antes o después
//de que el modelo haya sido almacenado en la BBDD
//En este caso, usamos una función que se ejecuta ANTES, para poder
//ENCRIPTAR la contraseña que mete el usuario
//OJO!!! EL CÓDIGO SIGUIENTE DABA ERROR POR HABER USADO UNA FCN CALLBACK. Lo cambié
//a function(next) y funcionó!!
//UserSchema.pre('save', (next) => {
UserSchema.pre('save', function(next) {
    let user = this
    if (!user.isModified('password')) return next()
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

//Avatar - a partir de un email, devuelve el avatar 
//Otra funcionalidad de mongoose: methods
UserSchema.methods.gravatar = function () {
    if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return 'https://gravatar/avatar/${md5}?s=200&d=retro'
}

module.exports = mongoose.model('User', UserSchema)

