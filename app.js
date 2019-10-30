require('dotenv').config();
let express = require('express');
let app = express()
let wordController = require('./controller/wordController');
let userController = require('./controller/userController')
const db = require('./db')

db.sequelize.sync()
app.use(express.json())
app.use(require('./middleware/headers'))

app.use('/user', userController)
// app.use(require('./middleware/validate-session'))
app.use('/word', wordController)

app.listen(process.env.CHANNEL, () => console.log(`listening on ${process.env.CHANNEL}`));
