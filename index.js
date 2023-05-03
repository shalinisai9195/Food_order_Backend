const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

// mongoose.connect(process.env.URL,()=> console.log("DB is connected"))
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
.then(() => console.log("DB Connected..!"))
.catch(err => console.log(err))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)


app.listen(5000,() => console.log("server listing"))