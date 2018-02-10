import path from 'path'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Knex from 'knex'

import config from '../config/config.js'
import routes from './controllers/routes'
import apis from './controllers/apis'

const app = express()

app.set('config', config)

/*
  Parsers
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

/*
  View Engine
*/
app.set(
  'views',
  path.join(__dirname, '../app/templates')
)
app.locals.basedir = app.get('views')
app.set('view engine', 'pug')

/*
  Logger
*/
app.use(logger('dev'))

/*
  Static path
*/
app.use(express.static(path.join(__dirname, '../static')))

/*
  Knex
*/
const knex = Knex(config.database)
app.set('knex', knex)

/*
  Load Controllers
*/
routes(app)
apis(app)

export default app
