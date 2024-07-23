const express = require('express');
const body_parser = require('body-parser');

const app = express();

// Middleware to parse URL-encoded data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

const homeRoute = require('../routes/home_route');
const dialogflowRoute = require('../routes/dialogflow_route');
const updateSessionData = require('../routes/update_routes');

app.use(homeRoute.router);
app.use(dialogflowRoute.router);
app.use(updateSessionData.router);

app.post('/webhook', (req, res) => {
    try {
        console.log('Raw Body:', req.body);
        
        let intent = req.body.queryResult.intent.displayName;
        let parameters = req.body.queryResult.parameters;

        if (intent === 'module') {
            let selectedOptions = [];

            // Check which options were selected by the user
            if (parameters.option1) {
                selectedOptions.push('Option 1');
            }
            if (parameters.option2) {
                selectedOptions.push('Option 2');
            }
            if (parameters.option3) {
                selectedOptions.push('Option 3');
            }

            // Respond with the selected options
            let responseText = `You selected: ${selectedOptions.join(', ')}`;
            return res.json({
                fulfillmentText: responseText,
            });
        } else {
            return res.json({
                fulfillmentText: "Unknown intent. Please try again.",
            });
        }
    } catch (error) {
        console.error('Error handling webhook request:', error);
        return res.status(500).json({
            fulfillmentText: 'Internal server error',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
