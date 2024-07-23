const db = require('../config/db');




function updateSessionData(sessionId, no_of_consultant, no_of_sites, callback) {
    const query = `
        INSERT INTO session_data (sessionId, no_of_consultant, no_of_sites)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
            no_of_consultant = COALESCE(VALUES(no_of_consultant), no_of_consultant),
            no_of_sites = COALESCE(VALUES(no_of_sites), no_of_sites)
    `;

    db.query(query, [sessionId, no_of_consultant, no_of_sites], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return callback(err);
        }
        callback(null, 'Data saved successfully');
    });
}


module.exports = {
    updateSessionData
};