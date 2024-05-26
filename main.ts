#! / usr/bin/env node

import inquirer from "inquirer"

const randomNumber: number = Math.floor(10000 + Math.random() * 90000)

let myBalance: number = 0

let answer = await inquirer.prompt(
    [
        {
            name: "students",
            type: "input",
            message: "Enter student name:",
            validate: function (valu) {
                if (valu.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";
            },
        },
        {
        name: "Courses",
        type: "list",
        message: "Select the course to enrolled",
        choices: ["HTML", "CSS", "MS.Office", "JavaScript", "TypeScript", "Python"]
        }
    ]
);

const tutionFee: {[key: string]: number} = {
    "HTML": 2000,
    "CSS": 3000,
    "MS.Office": 2000,
    "JavaScript": 5000,
    "TypeScript": 7000,
    "Python": 10000
};

console.log(`\nTution Fees: ${tutionFee[answer.Courses]}-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt ([
    {
        name: "payment",
        type: "list",
        message: "Select payment method",
        choices: ["Banak Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name:"amount",
        type:"input",
        message:"Transfer Money:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    }
]);

console.log(`\nYou select payment method ${paymentType.payment}\n`);

const tutionFees = tutionFee[answer.Courses];
const paymentAmount = parseFloat(paymentType.amount)

if (tutionFees === paymentAmount) {
    console.log(`Congratulations, you have successfully enrolled in ${answer.Courses}.\n`);

    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ])

    if (ans.select === "View Status"){
        console.log("\n******Status*******\n");
        console.log(`Student Name: ${answer.students}`);
        console.log(`Stydent ID: ${randomNumber}`);
        console.log(`Course: ${answer.Courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    } else {
        console.log("\nExiting student Management System\n");
    }

    } else {
        console.log("Invalid amount due to course\n");
    }