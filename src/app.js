const express = require('express');
const app = express();

const db = require('./db/conn');
const Student = require('./models/students');
const port = process.env.PORT || 3000;


// AS I WANT TO REGISTER A NEW STUDENT, I WILL USE POST METHOD
app.use(express.json());


// Create a new student

app.post("/students", async (req, res) => {
    console.log(req.body);
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(200).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
})

// READ THE DATA OF REGISTERED STUDENTS
app.get("/students", async (req, res) => {

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
        console.log(studentsData);
    } catch (e) {
        res.status(400).send(e);
    }

})

// GET THE INDIVIDUAL STUDENT'S DATA USING ID
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }
    } catch (e) {
        res.send(e);
    }
})

// UPDATE THE INDIVIDUAL STUDENT'S DATA USING ID
app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate
            (_id, req.body, {
                name: "Rohan Das"
            });
        res.send(updateStudent);
    } catch (e) {
        res.status
            (404).send(e);
    }
    console.log(updateStudent);
})

// DELETE THE INDIVIDUAL STUDENT'S DATA USING ID
app.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
    } catch (e) {
        res.status(500).send(e);
    }
})



app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});

// we dont need express.json() and express.urlencoded() for GET and POST requests
// but we need it for PUT and DELETE requests

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
//  This method is called as a middleware in your application using the code: app.use(express.json());