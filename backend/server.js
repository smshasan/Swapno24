const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })

// connect database;
connectDatabase();

const PORT = 4990
app.get('/', (req, res) => {
        res.send('Alhamdulillah Working')
});


// import routes
const auth = require('./routes/auth');

app.use('/api/v1', auth)

app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
})