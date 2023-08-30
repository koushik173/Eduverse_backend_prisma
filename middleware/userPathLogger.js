const fs = require('fs');
const path = require('path');

const logFilepath = path.join(__dirname, '../UserLogInfo/usersPaths.log');
const userPathLogger = (req, res, next) => {

    const { method, url, ip } = req;
    const user = req.user? req.user.id: 'unknown';
    const dateObject = new Date();
    const logEntry = `[${dateObject.toDateString()} __${dateObject.toTimeString()}]__user:${user} ip=${ip}__method:${method}__url:${url}\n`;
    // console.log(logEntry);

    fs.appendFile(logFilepath, logEntry, (err) => {
        if (err) {
            console.error('Error in paths log:', err.message);
        }
    });

    next();
};
module.exports = { userPathLogger };