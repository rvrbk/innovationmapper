import 'dotenv/config'; // This ensures dotenv is loaded
import axios from 'axios';

export async function POST({ request }) {
    try {
        const { query } = await request.json();

        // let response = await axios.post('https://api.openai.com/v1/chat/completions', {
        //     model: 'gpt-3.5-turbo',
        //     messages: [
        //         { role: 'system', content: 'Respond in json format with the asked for keys.' },
        //         { role: 'user', content: `Give me the age groups with an array under the key 'age' with max 2 entries to whom the product ${query} might best be sold.` },
        //         { role: 'user', content: `Give me the political preference, 'republican', 'democrats' or 'independent' to which the product ${query} can best be sold under the key 'politics'` }
        //     ]
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        //     }
        // });

        let response = await axios.get('https://api.census.gov/data/timeseries/poverty/histpov2', {
            get: 'NAME,B01001_001E',
            for: 'state:*',
            key: process.env.CENSUS_API_KEY
        });

        console.log(response.data)

        //console.log(response.data.choices[0].message.content);

        return new Response(JSON.stringify({ success: true, message: response.data.choices[0].message.content }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
