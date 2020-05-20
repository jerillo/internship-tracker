const express = require('express')
const app = express();

// Require routes
const indexRoutes = require('./routes/index');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRoutes);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
