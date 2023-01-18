const { text } = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
mongoose.connect(process.env.mongoUrl,{dbName:"mydb"})

const educationSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    grade: Number,
    institution: String,
    course: String
})


const experienceSchema = new mongoose.Schema({
    companyName: String,
    workStartDate: Date,
    workEndDate: Date,
    description: String
})

const socialSchema = new mongoose.Schema({
    linkedIn: String,
    facebook: String,
    github: String
})

const projectSchema = new mongoose.Schema({
    projectTitle: String,
    pDescripton: String,
    project_link: String
})

const certificationSchema = new mongoose.Schema({
    certificationCourseName: String,
    certificationStartDate: Date,
    certificationEndDate: Date,
    certificate: String,
    certificationInstitution: String
})

const languageSchema = new mongoose.Schema({
    language: String
});


const skillsSchema = new mongoose.Schema({
    skills: String
})

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    education: [],
    skills: [],
    experience: [],
    social: {},
    languages: [],
    certifications: [],
    projects: []
});
const User = mongoose.model("User", usersSchema);
const Education = mongoose.model("Education", educationSchema);
const WorkExperience = mongoose.model("WorkExperience", experienceSchema);
const Project = mongoose.model("Project", projectSchema);
const Certification = mongoose.model("Certification", certificationSchema);
const Social = mongoose.model("Social", socialSchema);
const Language = mongoose.model("Language", languageSchema);
const Skills = mongoose.model("Skills", skillsSchema);
var schemas = {
    'User': User,
    "Education": Education,
    "WorkExperience": WorkExperience,
    "Social": Social,
    "Project": Project,
    "Certification": Certification,
    "Language": Language,
    "Skills": Skills
}

module.exports = schemas;