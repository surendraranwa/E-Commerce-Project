const express = require('express');
const port = 4000;
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://surendraranwa20:12345678Suri@cluster0.3ga45.mongodb.net/e-commerce");

// API Creation
app.get('/', (req, res) => {
    res.send("Express App is Running");
});

// Image Storage
const storage = multer.diskStorage({
    destination: './upload/Images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve static files in the 'upload/Images' directory
app.use('/Images', express.static('upload/Images'));

// Image Upload Endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/Images/${req.file.filename}`
    });
});

// Schema For Creating Products
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Product Creation Endpoint
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    try {
        await newProduct.save();
        console.log("Product saved:", newProduct);
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Product could not be saved." });
    }
});

// API for Deleting a Product
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log('Product removed');
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Product could not be removed." });
    }
});

// API for Getting All Products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Could not fetch products." });
    }
});

//Creating Endpoint fot new-Collection
app.get('/new_collections', async (req,res)=>{
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newCollection);
})

// //Creating Endpoint fot popular in Women section
// app.get('/popular_women', async (req,res)=>{
//     let products = await Product.find({});
//     let popularsection = products.category === 'women';
//     console.log("New Collection Fetched");
//     res.send(popularsection);
// })

//Creating Endpoint fot popular in Women section
app.get('/popularInWomen', async (req,res)=>{
        let products = await Product.find({category: "women"});
        let popular_in_womens = products.slice(0,4);
        console.log("New Collection Fetched");
        res.send(popular_in_womens);
    });

// Creating middleware to fetch User

const fetchUser = async (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please Authenticate With Valid Token"});
    }else{
         try {
            const data = jwt.verify(token, 'secret-ecom');
            req.user = data.user;
            next();
         } catch (error) {
            res.status(401).send({errors: "Please Authenticate With Valid Token"});
         }
    }
}

// Creating Endpoint For Adding Product in the Cart
app.post('/addtocart',fetchUser, async (req,res)=>{
    let userData = await User.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await User.findOneAndUpdate({_id: req.user.id},{cartData : userData.cartData});
    res.send("Added");
});

// Creating Endpoint For Removing Product in the Cart
app.post('/removetocart',fetchUser, async (req,res)=>{
    let userData = await User.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId] >0)
    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId]) - 1;
    await User.findOneAndUpdate({_id: req.user.id},{cartData : userData.cartData});
    res.send("Removed");
});

//creating endpoint To get cart Items

app.post('/getcart', fetchUser, async (req,res)=>{
    console.log("Get Cart Items");
    let userData = await User.findOne({_id : req.user.id});
    res.json(userData.cartData);
});
//User Schema 

const User = mongoose.model('Users',{
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

//Creating endpoint for User Registration

app.post('/signup', async (req,res)=>{
    let check = await User.findOne({email: req.body.email});

    if(check){
        return res.status(400).json({success: false, errors : 'Duplicate Email'});
    }

    let cart = {};
    for (let i=0; i<300;i++){
        cart[i]=0;
    }

    const newUser = new User({
        name: req.body.username,
        email:req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await newUser.save();

    const data ={
        user :{
            id: newUser.id,
        }
    }

    const token = jwt.sign(data, 'secret-ecom');

    res.json({success:true, token});
});

// Creatig ENdpoint For UserLogin

app.post('/login', async (req, res)=>{
    let user = await User.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user :{
                    id: user.id,
                }
              
            }
            const token = jwt.sign(data, 'secret-ecom');
            res.json({success:true, token});
           
            }else{
            res.json({success:false, errors: 'Wrong Password'});
        }
        }else{
            res.json({success:false, errors: 'Wrong EmailID'})
        }
})


app.listen(port, (error) => {
    if (!error) {
        console.log('Server Running on Port ' + port);
    } else {
        console.log('Error:', error);
    }
});
