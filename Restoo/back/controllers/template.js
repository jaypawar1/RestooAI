const axios = require('axios');
const Template = require('../models/Template');
const { model } = require('mongoose');

const createTemplate = async (req, res) => {
    try {
        // Make POST request to Aisensy API
        const response = await axios.post('https://backend.aisensy.com/direct-apis/t1/wa_template', {
            name: 'free_item_2',
            category: 'MARKETING',
            language: 'en',
            components: [
                {
                    type: 'BODY',
                    text: `Hey, let's enjoy our special meal FREE! \n Join us for delicious delights & a FREE {{1}} that you don't want to miss out. \n Grab your free special dish '{{2}}' now! \n Don’t miss this! \n Hello 123`,
                    example: {
                        body_text: [
                            [
                                'PBM',
                                'PBM'
                            ]
                        ]
                    }
                },
                {
                    type: 'BUTTONS',
                    buttons: [
                        {
                            type: 'URL',
                            text: 'Connect on web',
                            url: 'https://restooai.com/{{1}}',
                            example: [
                                'https://www.yoursite.com/dynamic-url-example'
                            ]
                        }
                    ]
                }
            ]
        }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3Npc3RhbnRJZCI6IjY2MGU5OTM4ODU4NWNmMGJmZDZjN2U2YSIsImNsaWVudElkIjoiNjYwZTk5Mzg4NTg1Y2YwYmZkNmM3ZTYwIiwiaWF0IjoxNzEyNjU0NzQxfQ.pJC6GIOr8C_2hxvzeYJ2yjoWojwqB0u21v_cc7Mya54',
                'Content-Type': 'application/json'
            }
        });

        // Create and save the template in the database
        const temp = new Template({
            name: 'Free Template',
            id: response.data.id,
            user: req.user._id
        });

        await temp.save();

        // Send response back to client
        res.status(200).json(response.data);

    } catch (error) {
        console.error('Error making request to Aisensy API:', error);
        res.status(500).json({ message: 'Error making request to Aisensy API', error: error.message });
    }
};
const sendTemplate = async (req, res) => {
    const { url, item , number } = req.body; // Destructuring the required parameters from the request body

    try {
        const response = await axios.post('https://backend.aisensy.com/direct-apis/t1/messages', {
            to: number,
            type: 'template',
            template: {
                language: {
                    policy: 'deterministic',
                    code: 'en'
                },
                name: 'free_item_2',
                components: [
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: item
                            }, {
                                type: 'text',
                                text: item
                            }
                        ]
                    },
                    {
                        type: 'button',
                        sub_type: 'url',
                        index: '0',
                        parameters: [
                            {
                                type: 'text',
                                text: url
                            }
                        ]
                    }
                ]
            }
        }, {
            headers: {
                'Accept': 'application/json, application/xml',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3Npc3RhbnRJZCI6IjY2MGU5OTM4ODU4NWNmMGJmZDZjN2U2YSIsImNsaWVudElkIjoiNjYwZTk5Mzg4NTg1Y2YwYmZkNmM3ZTYwIiwiaWF0IjoxNzEyNjU0NzQxfQ.pJC6GIOr8C_2hxvzeYJ2yjoWojwqB0u21v_cc7Mya54',
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error making request to Aisensy API:', error);
        res.status(500).json({ message: 'Error making request to Aisensy API', error: error.message });
    }
}


module.exports = { createTemplate, sendTemplate };

