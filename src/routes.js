const {Router} = require('express')
const authMiddleWare = require('./auth')
const jwt = require('jsonwebtoken');
const db2 = require('./db')

const routes = Router()

routes.get('/', (req, res) => {
    res.json({
        message: "Funcionando perfeitamente"
    })
})


routes.post('/auth', (req, res) => {
    
    
    const client = {
        login: req.body.login,
        password: req.body.password
    }
    
    console.log(client);
    
    db2.selectUsesr().then( result => {
        console.log(result);
        
        if (result.login === client.login && result.password === client.password) {
            res.send({authenticated: true, token: jwt.sign(client, 'PRIVATEKEY') ,client })
            console.log('User authenticated');
        }else {
            res.send({authenticated: false})
            console.log('User not authenticated');
        }
    } )
})

routes.use(authMiddleWare)

routes.get('/users', (req, res) => {
    res.send({
        message: 'Tudo ok'
    })
})

module.exports = routes;