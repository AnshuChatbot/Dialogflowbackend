const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/export_controller');
const db = require('../config/db');


router.post('/CheckData', (req, res) => {
    console.log(req.body);
    const {
        sessionInfo: { sessionId },
        fulfillmentInfo: { tag },
        parameters
    } = req.body;
    let no_of_consultant = null;
    let no_of_sites = null;

    // Determine the value based on the tag
    if (tag === 'consultantTag') {
        no_of_consultant = parameters.no_of_consultant || null;
    } else if (tag === 'siteTag') {
        no_of_sites = parameters.no_of_sites || null;
    }

    // Update the session data
    CONTROLLER.update_controller.updateSessionData(sessionId, no_of_consultant, no_of_sites, (err, message) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(message);
    });
});


module.exports = {
    router
};