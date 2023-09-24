const express = require('express')
const app = express()
const port = process.env.PORT || 3001


var cors = require('cors')
const bodyParser = require('body-parser')
const { getAllCategoriesController } = require('./controllers/category.controller');
app.use(cors())

const router = require('./routes');
const { getUrgeCategoryController } = require('./controllers/urge.controller')
const { queryHuggingFaceAPI } = require('./services/urge.service')

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!')
})
console.log(getAllCategoriesController);
console.log(queryHuggingFaceAPI);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})
