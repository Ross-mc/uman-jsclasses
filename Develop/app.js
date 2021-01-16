const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "../output");
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
        'name': 'school',
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

    const html = render([...manager,...engineers,...interns]);

    fs.writeFile(outputPath, html, (err) => {
        if (err) return console.log(err)
        console.log('File Successfully Generated')
    })


    
}





init()