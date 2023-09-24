const express = require('express')
const app = express()
const port = process.env.PORT || 3001


var cors = require('cors')
const bodyParser = require('body-parser')
const { getAllCategoriesController } = require('./controllers/category.controller');
app.use(cors(
    cors({
        origin: ['https://zenithweb.netlify.app','http://localhost:5173']
    })
))

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
