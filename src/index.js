const express = require('express')
const app = express()
const port = 3001


var cors = require('cors')
const bodyParser = require('body-parser')
const { getAllCategoriesController } = require('./controllers/category.controller');
app.use(cors())

const router = require('./routes');
const { getUrgeCategoryController } = require('./controllers/urge.controller')

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log(getAllCategoriesController);
console.log(getUrgeCategoryController);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})
