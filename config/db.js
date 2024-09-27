// //config/db.js
// const mongoose = require('mongoose');

// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err.message);
//     }
// }

// module.exports = connectDB;
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;
