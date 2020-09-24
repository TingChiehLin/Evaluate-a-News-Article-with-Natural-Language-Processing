 //"test": "echo \"Error: no test specified\" && exit 1",
var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
let bodyParser = require('body-parser');

const mockAPIResponse = require('./mockAPI.js')
const application_Key = process.env.API_KEY;

 // environment variables requirments
const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/result', async(req,res) =>{
    try {
        const nameValues = {
            'J+': 'Rich',
            'J': 'lively',
            'B': 'Friendly',
            'N': 'Basketball Star',
            'To': 'Play as actor',
            'None': 'No Comment'
        };

        let apiUrl =  `https://api.meaningcloud.com/sentiment-2.1?key=${application_Key}&url=${req.body.userUrl}&lang=en`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        if(data.status.msg === 'OK') {
            const results = {};
            results.credits = data.status.credits;
            results.label = data.category_list.label;
			results.term = data.category_list.term_list;
			res.json(evaluation)
		} else {
			res.json({msg: data.status.msg})
		}

    } catch (err) {
        res.status(500).send({
            status: 'error',
        })
    }
})



// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Server is working on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
