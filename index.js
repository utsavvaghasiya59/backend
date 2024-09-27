// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/db');
// const router = require('./routes');
// const cookieParser = require('cookie-parser');

// const app = express();
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ limit: '1mb', extended: true }));

// app.use(cookieParser());
// app.use('/api', router);

// const PORT = process.env.PORT || 8080;
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("Connected to DB..");
//         console.log("Server is running");
//     });
// });





const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }));

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ limit: '1mb', extended: true }));

    app.use(cookieParser());
    app.use('/api', router);

    const PORT = process.env.PORT || 8080;

    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Worker ${process.pid} started`);
            console.log("Connected to DB..");
            console.log("Server is running");
        });
    });
}
