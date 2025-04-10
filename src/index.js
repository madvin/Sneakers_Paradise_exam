import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { tempDataMiddleware } from './middlewares/tempDataMiddleware.js';
import { auth } from './middlewares/authMiddlewares.js';


const app = express();

let dbName = 'mySneakersDB';


try {
    const uri = `mongodb://localhost:27017/${dbName}`;
    await mongoose.connect(uri);

    console.log('DB is Connected!');
} catch(err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');


app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(tempDataMiddleware);
app.use(auth);
app.use(routes);


app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));