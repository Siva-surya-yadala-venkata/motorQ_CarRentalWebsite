const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connect } = require('http2');
const connectDb = require('./models/dbConnect');
app.use(express.urlencoded({extended: true}));
const Car = require('./models/Car');
const User=require("./models/User");

connectDb();
app.use(express.json());
app.use(cors());
app.use(express.static('public'))


// app.use()
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/car-inventory');

// User Schema
// const UserSchema = new mongoose.Schema({
//     email: String,
//     password: String,
// });




// User registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
});

// app.post('/send', async (req, res) => {
//     console.log(req.body);
//     const data = req.body;
//     const car = new User({
//         email: data.email,
//         password: data.password,
        
//     })

//     await user.save();
//     console.log(user);
//     res.render('login.ejs', {
//         info : "Login Successfully"
//     });
// })

app.post('/send', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const car = new Car({
        make: data.make,
        model: data.model,
        fuelType: data.fuelType,
        registrationNumber: data.registrationNumber,
        rent: data.rent,
        year: data.year,
    })

    await car.save();
    console.log(car);
    res.render('crud.ejs', {
        info : "Booked Successfully"
    });
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.get('/rent', (req, res) => {
    res.render('crud.ejs')
})

app.get('/index', (req, res) => {
    res.render('index.ejs')
})


//Here to onwards
// // User login
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
//     res.json({ token });
// });

// // Here One  Last
// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Access denied' });
    }

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};


// Here onwards
// Fetch cars
// app.get('/Cars', authenticateJWT, async (req, res) => {
//     const cars = await Car.find({ userId: req.user.userId });
//     res.json(cars);
// });

// //Add new car
// app.post('/Cars', authenticateJWT, async (req, res) => {
//     const car = new Car({ ...req.body, userId: req.user.userId });
//     await car.save();
//     res.status(201).json(car);
// });

// //Delete car
// app.delete('/Cars/:id', authenticateJWT, async (req, res) => {
//     await Car.findByIdAndDelete(req.params.id);
//     res.status(204).json({ message: 'Car deleted' });
// });    

// Here on last
app.get('/', (req, res) => {
    res.render('index.ejs');
})

     

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


