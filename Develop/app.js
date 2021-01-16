const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managerPrompts = [
    {
        'name': 'name',
        'type': 'input',
        'message': 'Please enter the Manager\'s name:'
    },
    {
        'name': 'id',
        'type': 'input',
        'message': 'Please enter the Manager\'s ID number:'
    },
    {
        'name': 'email',
        'type': 'input',
        'message': 'Please enter the Manager\'s email:'
    },
    {
        'name': 'officeNumber',
        'type': 'input',
        'message': 'Please enter the Manager\'s officeNumber:'
    }
]

const engineerPrompts = [
    {
        'name': 'name',
        'type': 'input',
        'message': 'Please enter the Engineer\'s name:'
    },
    {
        'name': 'id',
        'type': 'input',
        'message': 'Please enter the Engineer\'s ID:'
    },
    {
        'name': 'email',
        'type': 'input',
        'message': 'Please enter the Engineer\'s email:'
    },
    {
        'name': 'github',
        'type': 'input',
        'message': 'Please enter the Engineer\'s Github:'
    }
];

const internPrompts = [
    {
        'name': 'name',
        'type': 'input',
        'message': 'Please enter the Intern\'s name:'
    },
    {
        'name': 'id',
        'type': 'input',
        'message': 'Please enter the Intern\'s ID:'
    },
    {
        'name': 'email',
        'type': 'input',
        'message': 'Please enter the Intern\'s email:'
    },
    {
        'name': 'shcool',
        'type': 'input',
        'message': 'Please enter the Intern\'s School:'
    }
];

const manager = [];
const engineers = [];
const interns = [];

const addManager = async () => {
    await inquirer
    .prompt(managerPrompts)
    .then(managerAnswers => {
        const { name, id, email, officeNumber } = managerAnswers
        const generatedManager = new Manager(name, id, email, officeNumber);
        manager.push(generatedManager)
    });

    return Promise.resolve();


}

const addEngineer = async () => {
    await inquirer
    .prompt(engineerPrompts)
    .then(engineerAnswers => {
        const { name, id, email, github } = engineerAnswers
        const engineer = new Engineer(name, id, email, github);
        engineers.push(engineer)
    });

    let addNewEngineer = false;

    await inquirer
    .prompt([
        {
        'name': 'confirm',
        'type': 'confirm',
        'message': 'Would you like to add another Engineer?'
        }
    ])
    .then(nextEngineer =>{
        addNewEngineer = nextEngineer.confirm
    })

    return addNewEngineer
};

const addIntern = async () => {
    await inquirer
    .prompt(internPrompts)
    .then(internAnswers => {
        const { name, id, email, school } = internAnswers
        const intern = new Intern(name, id, email, school);
        interns.push(intern)
    })
    let addNewIntern = false;

    await inquirer
    .prompt([
        {
        'name': 'confirm',
        'type': 'confirm',
        'message': 'Would you like to add another Intern?'
        }
    ])
    .then(nextIntern =>{
        addNewIntern = nextIntern.confirm
    });

    return addNewIntern
}

const init = async () => {

    await addManager();

    let addingEngineers = true;
    while(addingEngineers){
        addingEngineers = await addEngineer();
    }

    let addingInterns = true;
    while(addingInterns){
        addingInterns = await addIntern();
    }
    
}





init()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
