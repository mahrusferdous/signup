const express = require('express')
const bodyParse = require('body-parser')
const request = require('request')
const app = express()
const https = require('https');

app.use(express.static("public"))
app.use(bodyParse.urlencoded({extended: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

//Confused behond this line-------
app.post("/", function(req, res) {
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)
  const url = // milchimp url
  const options = {
    method: "POST",
    auth: // mailchimp code
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData)
  request.end()
})

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is runningon port 3000.")
})
