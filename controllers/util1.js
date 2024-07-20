// const util = require('util');
// const db = require('./config/db');

// // Promisify the db.query function
// const query = util.promisify(db.query).bind(db);

// // Export the promisified query function
// module.exports = {
//     query
// };


const util = require('util');
const db = require('../config/db'); // Your MySQL connection configuration

// Promisify the db.query function for use with async/await
const query = util.promisify(db.query).bind(db);

// Function to insert data into the database
const saveDataToDb = async (text1) => {
    const sql = 'INSERT INTO res1 (text1) VALUES (?)';
    const values = [text1];
    try {
        return await query(sql, values);
    } catch (err) {
        throw new Error(`Database insert failed: ${err.message}`);
    }
};

const formatResponseForDialogflow = (texts, sessionInfo, targetFlow, targetPage) => {
    const messages = [];

    texts.forEach(text => {
        messages.push({
            text: {
                text: [text],
                redactedText: [text]
            },
            responseType: 'HANDLER_PROMPT',
            source: 'VIRTUAL_AGENT'
        });
    });

    const responseData = {
        fulfillment_response: {
            messages: messages
        }
    };

    if (sessionInfo !== '') {
        responseData['sessionInfo'] = sessionInfo;
    }

    if (targetFlow !== '') {
        responseData['targetFlow'] = targetFlow;
    }

    if (targetPage !== '') {
        responseData['targetPage'] = targetPage;
    }

    return responseData;
};

const getErrorMessage = () => {
    return formatResponseForDialogflow(
        [
            'We are facing a technical issue.',
            'Please try after some time or contact the XYZ restaurant.'
        ],
        '',
        '',
        ''
    );
};

module.exports = {
    formatResponseForDialogflow,
    getErrorMessage,
    saveDataToDb
};