const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

let alert = require("alert");
const async = require("hbs/lib/async");
const dotenv = require('dotenv')
dotenv.config()
const schemas = require((__dirname) + "/mongodb.js");


const User = schemas.User
const Education = schemas.Education;
const WorkExperience = schemas.WorkExperience;
const Certification = schemas.Certification;
const Project = schemas.Project;
const Language = schemas.Language;
const Social = schemas.Social;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))


app.get("/details/:email", (req, res) => {
    var email = req.params.email
    return res.render("webpage_1", { "email": email });
})

app.get("/signup", (req, res) => {
    return res.render("signup")
})

app.get("/login", (req, res) => {
    return res.render("login")
})

app.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;
    var data = new User({
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    })

    User.findOne({ "email": email }, (err, foundUser) => {
        if (foundUser) {
            alert("User already exists!");
        } else {
            console.log(data);
            User.create(data, (err) => {
                if (err) {
                    throw err
                }
            });

            return res.render("tilePage", { "email": email });
        }
    });

});


app.post("/login", (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    var data = {
        "email": email,
        "password": pass,
    }

    User.findOne({ "email": email }, (err, foundUser) => {
        if (foundUser) {
            if (foundUser.password == pass) {
                // return res.render("webpage_1", { "email": email })
                return res.render("tilePage", { "email": email, "name": foundUser.name })
                    //const optionDownload = document.getElementById("download");
            } else {
                console.log("Incorrect Password")
                alert("Incorrect Password!");
            }
        } else {
            alert("User does not exist"); // pop up
            return res.render("signup");
        }
    })
})
app.post("/select", (req, res) => {
    document.getElementById("add").onclick = function addDetails(event) {
        app.listen(event);
        res.render("webpage_1");
    }
});
//space for err

///////////////////////////////////////////////////////////////////////
// My details APIs
//education api
app.post("/education/:email", async(req, res) => {
        var email = req.params.email
        var institution = req.body.institution;
        var course = req.body.course;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var grade = req.body.grade;

        let data = {
            "institution": institution,
            "course": course,
            "startDate": startDate,
            "endDate": endDate,
            "grade": grade
        }

        console.log(data)
        let user = await User.findOneAndUpdate({ "email": email }, { "education": { "$push": data } }, { "new": true })
        console.log(user)

    })
    // api's for all,signup login same, alert diff package, send user info as context from fe, form actions, mongodb, templates
    //workex api
app.post("/workexperience/:email", async(req, res) => {
    var email = req.params.email
    var companyName = req.body.companyName;
    var workStartDate = req.body.workStartDate;
    var workEndDate = req.body.workEndDate;
    var description = req.body.description;

    let data = {
        "companyName": companyName,
        "workStartDate": workStartDate,
        "workEndDate": workEndDate,
        "description": description
    }

    console.log(data);
    let user = await User.findOneAndUpdate({ "email": email }, { "experience": { "$push": data } }, { "new": true })
    console.log(user);
})

//certification api
app.post("/certification/:email", async(req, res) => {
    var email = req.params.email
    var certificationCourseName = req.body.certificationCourseName;
    var certificationInstitution = req.body.certificationInstitution;
    var certificationStartDate = req.body.certificationStartDate;
    var certificationEndDate = req.body.certificationEndDate;
    var certificationFile = req.body.certificationFile;

    let data = ({
        "certificationCourseName": certificationCourseName,
        "certificationStartDate": certificationStartDate,
        "certificationEndDate": certificationEndDate,
        "certificationFile": certificationFile,
        "certificationInstitution": certificationInstitution
    })

    console.log(data);
    let user = await User.findOneAndUpdate({ "email": email }, { "certification": { "$push": data } }, { "new": true })
    console.log(user)
})

//language api

app.post("/language/:email", async(req, res) => {
    var email = req.params.email
    var language = req.body.language;

    let data = ({
        "language": language,
    })

    console.log(data);
    let user = await User.findOneAndUpdate({ "email": email }, { "language": { "$push": data } }, { "new": true })
    console.log(user)
})

//skills api

app.post("/skills/:email", async(req, res) => {
    var skills = req.body.skills;
    var email = req.params.email

    let data = ({
        "skills": skills,
    })

    console.log(data);
    let user = await User.findOneAndUpdate({ "email": email }, { "skills": { "$push": data } }, { "new": true })
    console.log(user)
})


//social api
app.post("/social/:email", async(req, res) => {
    var email = req.params.email
    var linkedIn = req.body.linkedIn;
    var github = req.body.github;
    var facebook = req.body.facebook;

    let data = {
        "linkedIn": linkedIn,
        "github": github,
        "facebook": facebook
    }

    console.log(data);
    let user = await User.findOneAndUpdate({ "email": email }, { "social": { "$set": data } }, { "new": true })
    console.log(user)
})

//project api
app.post("/project/:email", async(req, res) => {
        var email = req.params.email
        var project_link = req.body.project_link;
        var projectTitle = req.body.projectTitle;
        var pDescription = req.body.pDescription;

        let data = ({
            "project_link": project_link,
            "projectTitle": projectTitle,
            "pDescription": pDescription
        })

        console.log(data);
        let user = await User.findOneAndUpdate({ "email": email }, { "project": { "$push": data } }, { "new": true })
        console.log(user)
    })
    //tilepage api
    // app.post("/select", (req, res) => {
    //     const optionAdd = document.getElementById("add");
    //     optionAdd.addEventListener('optionAdd', () => {
    //         res.render("webpage1")
    //     });
    //     const optionDownload = document.getElementById("download");

// })

/////////////////////////////////////////////////////////////////////////////////  
app.get("/", (req, res) => {
    return res.render('home');
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`server started listening to port :${PORT}`);
    } else {
        console.log(`server not started listening to port :${PORT}`);
    }
})