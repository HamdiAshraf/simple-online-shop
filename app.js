const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const flash = require('connect-flash')
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)


const homeRoute = require('./routes/homeRoute');
const productRoute = require('./routes/productRoute')
const authRoute = require('./routes/authRoute')
const cartRoute = require('./routes/cartRouter')
const orderRoute = require('./routes/orderRoute')
const adminRoute = require('./routes/adminRoute')

const app = express();

const PORT = process.env.PORT || 3000;





app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(flash())

const STORE = new SessionStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    store: STORE
}))

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use('/', homeRoute);
app.use('/product', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);

app.get('/error',(req,res,next)=>{
    res.render('error', {
        isUser: req.session.isUser,
        isAdmin: req.session.isAdmin

    })
})

app.use((error,req,res,next)=>{
    res.redirect('/error')
})







// Connect to the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
        // Start the server after successfully connecting to the database
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch(err => console.log('Database connection error:', err));
