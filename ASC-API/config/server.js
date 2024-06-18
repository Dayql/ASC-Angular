const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const OpenApiValidator = require('express-openapi-validator')
//const swaggerUi = require('swagger-ui-express')
//const YAML = require('yamljs')
const passport = require('./passport')

//const swaggerDocument = YAML.load('./open-api.yml')
const app = express()


// Utilisation de cors
app.use(cors());
app.options('*', cors());

// Utilisation de bodyParser
app.use(bodyParser.json())

// Utilisation de passport
app.use(passport.initialize())

// Middleware d'openAPI
//app.use(
//    OpenApiValidator.middleware({
//        apiSpec: './open-api.yml',
//        ignoreUndocumented: true
//    })
//)

//app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/******  Modules de routage  ********/

const auth_router = require('../routes/authRoutes')
const product_router = require('../routes/productRoutes')
const mouvement_stock_router = require('../routes/mouvementStockRoutes');


/******  Routage  ********/

app.use('/auth', auth_router)
app.use('/products', product_router)
app.use('/movements', mouvement_stock_router);

module.exports = app
