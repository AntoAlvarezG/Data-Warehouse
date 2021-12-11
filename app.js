const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('express-jwt');
const loginRouter = require('./routes/loginRoute');
const usersRouter = require('./routes/usersRoutes');
const locationRouter = require('./routes/locationRoutes');
const companiesRouter = require('./routes/companiesRoutes');
const contactsRouter = require('./routes/contactsRoutes');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(
    jwt({ secret: process.env.ACCESS_TOKEN_SECRET, 
        algorithms: ['HS256'] }
    ).unless({ path: ['/login'] })
)

//routes
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/regions', locationRouter);
app.use('/companies', companiesRouter);
app.use('/contacts', contactsRouter);

// starting server
app.set('port', 5000 || process.env.PORT);
const port = app.get('port');
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
});