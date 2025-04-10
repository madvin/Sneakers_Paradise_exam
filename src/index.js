import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { auth } from './middlewares/authMiddlewares.js';


const app = express();

let dbName = 'techStore'; //TODO name

//DB setup
try {
    const uri = `mongodb://localhost:27017/${dbName}`;
    await mongoose.connect(uri);

    console.log('DB is Connected!');
} catch(err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}

//Handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(auth);
app.use(routes);

// Start Express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));