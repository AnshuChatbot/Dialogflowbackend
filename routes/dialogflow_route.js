
const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/export_controller');
const CONTROLLER1 = require('../controllers/datasave_controller')
const db = require('../config/db');



router.post('/dialogflow', async (req, res) => {

    let tag = req.body.fulfillmentInfo.tag;
    console.log('A new request came...');
    console.log(tag);

    if (tag === 'Sample') {
        let responseData = CONTROLLER.sampleResponse.handleSampleResponse(req); 

        res.send(responseData);
    } else {
        res.send(
            CONTROLLER.util.formatResponse(
                [
                    'This is from the webhook.',
                    'There is no tag set for this request.'
                ]
            )
        );
    }
});

router.post('/saveData', async (req, res) => {
    try {
        
        await CONTROLLER1.handleSampleResponse(req);
        res.status(200).send({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send({ message: 'Error saving data' });
    }
});
module.exports = {
    router
};