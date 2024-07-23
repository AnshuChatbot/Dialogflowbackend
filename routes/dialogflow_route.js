
const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/export_controller');
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
    // const {
    //     detectIntentResponseId,
    //     intentInfo: { lastMatchedIntent, displayName: intentDisplayName, confidence },
    //     pageInfo: { currentPage, formInfo, displayName: pageDisplayName },
    //     sessionInfo: { session },
    //     fulfillmentInfo: { tag },
    //     messages,
    //     text,
    //     languageCode,
    //     languageInfo: { inputLanguageCode, resolvedLanguageCode, confidenceScore }
    //   } = req;

      let tag1 = req.body.fulfillmentInfo.tag;
           if(tag1 == 'DataSave'){
                let responseData = CONTROLLER.datasave_controller.DataSaveSampleResponse(req);
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

  

module.exports = {
    router
};