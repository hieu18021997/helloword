const winston = require('winston')
const path = require('path')
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logging_01.log' }),
        new winston.transports.DailyRotateFile({
            filename:  path.join(__dirname,'..' ,'logs', `app-logging-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            json: false,
            maxSize : '5000m',
            // maxFile : '10d'
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(({ level, message, timestamp , ...metadata})=> {
            let msg = `${timestamp} : ${message}`
            return msg
        })
    ),
})

module.exports = (...args) => logger.info.call(logger, ...args)