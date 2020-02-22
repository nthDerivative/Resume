const express = require("express");
const path = require("path");

// used for the contact e-mail section
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");

const fs = require("fs");
const app = express();
app.locals.moment = require('moment');

// pug view engine
app.set("view engine", "pug");

// app use section
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log(`Rendering Home`);
    //inclusion of JSON files for the data
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));
    const hardskillsdata = JSON.parse(fs.readFileSync('./json/hardskills.json'));
    const personaldata = JSON.parse(fs.readFileSync('./json/personal.json'));
    const softskillsdata = JSON.parse(fs.readFileSync('./json/softskills.json'));

    res.render("about", {
        //passing JSON data to the pug file to render
        page: "about",
        title: "About me",
        personal: personaldata,
        projectslist: projectdata.profiles,
        languagelist: hardskillsdata.languages,
        softwarelist: hardskillsdata.software,
        softskills: softskillsdata.profiles,
        proficiencylist: hardskillsdata.proficiences
    });
});

app.get("/timeline", (req, res) => {
    //inclusion of JSON files for the data
    const jobdata = JSON.parse(fs.readFileSync('./json/experience.json'));
    const hardskills = JSON.parse(fs.readFileSync('./json/hardskills.json'));
    const personaldata = JSON.parse(fs.readFileSync('./json/personal.json'));

    const year = jobdata.profiles.find(p => p.id === req.query.id);
    const languages = hardskills.languages.find(p => p.id === req.query.id);

    res.render("timeline", {
        //passing JSON data to the pug file to render
        name: personaldata.first + " " + personaldata.last,
        jobexperience: jobdata.profiles,
        languagelist: hardskills.languages,
        softwarelist: hardskills.software,
        title: `My History`,
        languages,
        year,
        activepage: "#timelinelink",
    });
});

app.get("/projects", (req, res) => {
    //inclusion of JSON files for the data
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));
    const project = projectdata.profiles.find(p => p.id === req.query.id);

    res.render("projects", {
        //passing JSON data to the pug file to render
        title: "My Projects",
        projectslist: projectdata.profiles,
        project,
        activepage: "#projectslink",
    });
});

app.get("/projectdetails", (req, res) => {
    //inclusion of JSON files for the data
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));
    const project = projectdata.profiles.find(p => p.id === req.query.id);

    res.render("projectdetails", {
        //passing JSON data to the pug file to render
        title: `About ${project.title}`,
        projectslist: projectdata.profiles,
        project,
        activepage: "#projectslink",
    });
});

app.get("/contact", (req, res) => {
    //inclusion of JSON files for the data
    const personal = JSON.parse(fs.readFileSync('./json/personal.json'));

    res.render("contact", {
        //passing JSON data to the pug file to render
        title: `Contact me`,
        message: `ignore`,
        activepage: "#contactlink",
    });
});

app.post('/send_message', function (req, res) {
    //inclusion of JSON files for the data
    const personal = JSON.parse(fs.readFileSync('./json/personal.json'));

    //ensure your e-mail details are entered into the personal.json file
    let transporter = nodeMailer.createTransport({
        host: personal.smtp,
        port: personal.port,
        secure: false,
        auth: {
            user: personal.login,
            pass: personal.apppass
        }
    });
    let mailOptions = {
        from: personal.email,
        to: personal.email,
        subject: "Contact from " + req.body.name + " at " + req.body.company,
        text: req.body.email + " " + req.body.message,
    };

    //e-mail send function
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            const messagestatus = false;
        }

        const messagestatus = true;

        console.log(info.messageId, info.response);
        res.render("contact", {
            //passing JSON data to the pug file to render
            title: `Contact me`,
            message: messagestatus,
            alerttext: "Thank you " + req.body.name + " for your interest! I will respond as quickly as I can."
        });
    });
});

const server = app.listen(8080, () => {
    console.log(`Express running ? PORT ${server.address().port}`);
});