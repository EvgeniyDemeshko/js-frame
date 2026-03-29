require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
    console.error('Відсутній MONGO_URI у файлі .env');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Підключення до MongoDB успішне');
    } catch (error) {
        console.error('Помилка підключення до MongoDB:', error.message);
        console.log('Спроба повторного підключення через 5 секунд...');
        setTimeout(connectDB, 5000);
    }
}

const gracefulExit = async (signal) => {
    console.log(`Отримано сигнал ${signal}. Завершуємо роботу...`);
    try {
        await mongoose.connection.close(false);
        console.log('Відключено від MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Помилка при відключенні:', error);
    }
}

process.on('SIGINT', gracefulExit)
process.on('SIGTERM', gracefulExit)

module.exports = connectDB;