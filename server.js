var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const port=3000;
const app = express()

// app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.get('/', (req, res,next) => {
    res.sendFile(__dirname + '/index.html');
});


app.post("/contact", (req, res) => {
    var name = req.body.name || "" ;
    var email = req.body.email || "";
    var phone = req.body.phone || "";
    var message = req.body.message || "" ;

    
    console.log("Name:",name);
    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message
    }
  
    db.collection('users').insertOne(data, (err,collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Record Inserted Successfully");
        return res.status(200).json({ message: "Thank you for reaching out to us. We greatly appreciate your interest in our organization" });
    });
    
});
app.post("/donate", (req, res) => {
   
    var name = req.body.name || "";
    var email = req.body.email || "";
    var phone = req.body.phone || "";
    var packets = req.body.packets || 0;
    
    var donater = {
        "name": name,
        "email": email,
        "phone": phone,
        "packets": packets
    }
  
    db.collection('donations').insertOne(donater, (err,collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Record Inserted Successfully");
        return res.status(200).json({ message: "Thanks for the donation" });
    });
});
app.post("/internship",  (req, res) => {
   

    const { name, email, phno, internshipOption, resume, message } = req.body;

    const data = {
        "name": name,
        "email": email,
        "phno": phno,
        "internshipOption": internshipOption,
        "resume": resume,
        "message": message
    };

    db.collection('internshipApplications').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting internship record:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Internship Application Inserted Successfully");
        return res.status(200).json({ message: "Application submitted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
