var arg = process.argv.slice(2);
var target = arg[0]

const https = require('https')
const options = {
    hostname: 'codequiz.azurewebsites.net',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        "Cookie": "hasCookie=true",
    }
}

const req = https.request(options, res => {
    res.on('data', d => {
        var dString = d.toString()

        var results = dString.match(/<\s*td[^>]*>(.*?)<\s*\s*\/td>/g).map(function(val){
                // console.log(val)
                return val.replace(/<\/?td>/g,'');
        });

        var i = 0;
        for (; i < results.length; i++) {
            if (results[i].trim()===target.trim()) {
                break;
            }
        }

        console.log(results[i+1]);
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()