const winston = require('winston')
const path = require('path')
module.exports = {
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logging_01.log' }),
        new winston.transports.DailyRotateFile({
            filename:  path.join(__dirname, '..' ,'logs', `app-logging-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            json: false,
            maxSize : '5000m',
            // maxFile : '10d'
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        // winston.format.colorize(),
        // winston.format.splat(),
        // winston.format.align(),
        winston.format.printf(({ level, message, timestamp , ...metadata})=> {
            let msg = `${timestamp} : ${message}`
            // if(metadata) {
            //     msg += JSON.stringify(metadata)
            // }
            return msg
        }),
        
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "{{req.method}} {{req._parsedUrl.pathname}} {{res.statusCode}} {{res.responseTime}}ms ", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response
}