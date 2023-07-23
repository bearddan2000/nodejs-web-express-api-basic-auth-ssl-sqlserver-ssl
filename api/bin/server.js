var app = require('express')();
const cors = require('cors')();
const http = require('http');
const https = require('https');
const fs = require('fs');
const sql = require("mssql");
const basicAuth = require('express-basic-auth')

// middleware called before each route
app.use(cors);

app.use(basicAuth({
    users: { 'maria': 'pass' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

const sqlConfig = {
    user: 'sa',
    password: 'z!x<?oB1ab',
    //database: process.env.DB_NAME,
    server: 'db',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  };

app.get('/', function(req, res) {
    sql.connect(sqlConfig, function (err) {
      
        if (err) console.log(err);
  
        // create Request object
        var request = new sql.Request();
          
        // query to the database and get the records
        request.query('select * from dog', function (err, recordset) {
            
            if (err) console.log(err)
  
            // send records as a response
            res.json(recordset.recordset);
            
        });
    });
});

const httpServer = http.createServer(app);

const httpsServer = https.createServer({
    key: fs.readFileSync('/app/cert/server.key'),
    cert: fs.readFileSync('/app/cert/server.crt'),
  }, app);

httpServer.listen(8000, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
