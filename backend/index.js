const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userLogout_admin', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const User = require('./models/users');
// const validatelogin = require('./validation/logincheck_validation');

app.post('/insert', async (req, res) => {
    try {
        const data = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        const check = await User.findOne({ email: req.body.email });
        if (!check) {
            const resdata = await data.save();
            res.status(200).json({
                status: 1,
                data: resdata
            })
        } else {
            res.status(200).json({
                status: 2,
                message: 'Allrady Exists Email!!'
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const resdata = await User.findOne({ email: req.body.email, password: req.body.password });

        if (resdata) {

            const re = await User.findOneAndUpdate({ email: req.body.email }, {
                "$set": {
                    loginstatus: true
                }
            }, { "new": true }).select({ loginstatus: 0 });
            res.status(200).json({
                status: 1,
                data: re
            })
        } else {
            res.status(200).json({
                status: 2,
                message: 'Some Thing Wrong'
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        })
    }
})

app.post('/logincheck', async (req, res) => {
    try {
        const resdata = await User.findById(req.body.id).select({ loginstatus: 1, _id: 0 });
        res.status(200).json({
            status: 1,
            data: resdata
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        })
    }
})

app.get('/alluser', validatelogin, async (req, res) => {
    // console.log(validatelogin);
    try {
        const resdata = await User.find();
        res.status(200).json({
            status: 1,
            data: resdata
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        })
    }
})

mongoose.set('debug', true);
mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});



async function validatelogin(req, res, next) {
    console.log(req.headers);
    let token = req.get('Authorization');
    // console.log(token);
    if (token) {
        const resdata = await User.findById(token).select({ loginstatus: 1, _id: 0 });
        console.log(resdata);
        if (resdata.loginstatus != true) {
            res.json({
                status: 0,
                message: "User Blocked!!"
            })
        }
        next();
        // res.status(200).json({
        //     status: 1,
        //     data: resdata
        // })



    } else {
        res.json({
            status: 0,
            message: "Access denied! Unauthorizatin User!!"
        })
    }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})