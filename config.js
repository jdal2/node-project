module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb+srv://jdal3:12345@cluster0-blefq.mongodb.net/test?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavedetokens'
}

