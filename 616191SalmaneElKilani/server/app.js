const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/loginRoute');
const shoppingRoute = require('./routes/shoppingRoute');

const app = express();

app.use(cors());
app.use(express.json()); //req.body = {...}

app.use('/login', loginRoute);

const checkAuth = (req, res, next) => {
    const authToken = req.get('Authorization');
    if (authToken) {
      // pass authToken to next middleware or route handler
      req.authToken = authToken;
      next();
    } else {
      res.redirect('/login.htm');
    }
};

app.use('/', checkAuth, shoppingRoute);


app.listen(4000, ()=>console.log('listen on 4000'));