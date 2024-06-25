#! /usr/bin/env node
//This project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc. The status will show all the details of the student including name, id, courses enrolled and balance.This is one of the best projects to implement the Object Oriented Programming concepts.
import inquirer from "inquirer";
import chalk from "chalk";
//Define the student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //Intialize an empty array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view balance
    view_balance() {
        console.log(chalk.green(`Balance for ${this.name} : $${this.balance}`));
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.green(`Fees paid sucessfully for ${this.name}, paid $${amount}, and now has $${this.balance}.`));
    }
    // Method to show status
    show_status() {
        console.log(chalk.cyanBright(`ID: ${this.id}`));
        console.log(chalk.cyanBright(`Name: ${this.name}`));
        console.log(chalk.cyanBright(`Courses: ${this.courses}`));
        console.log(chalk.cyanBright(`Balance: $${this.balance}`));
    }
}
//Define a Student_Managing class to manage students
class Student_Managing {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`Student: ${name} added sucessfully. Student ID: ${student.id}`));
    }
    //Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.green(`Student: ${student.name} enrolled in ${course} course sucessfully.`));
        }
    }
    //Method to view balance
    view_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter a correct student ID"));
        }
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter a correct student ID"));
        }
    }
    //Method to show status
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter a correct student ID"));
        }
    }
    //Method to find student by student ID
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main Function to run the Program
async function main() {
    console.log(chalk.blue.bold("Welcome to 'Syed Hamail Program' - Student Management System"));
    console.log(chalk.bold.gray("-".repeat(60)));
    let student_managing = new Student_Managing();
    // While loop totrue program running
    while (true) {
        let choice = await inquirer.prompt([{
                type: "list",
                name: "choice",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
            }]);
        //Using switch case  for user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([{
                        type: "input",
                        name: "name",
                        message: "Enter Student Name"
                    }]);
                student_managing.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([{
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID"
                    },
                    {
                        type: "input",
                        name: "course",
                        message: "Enter Course Name"
                    }]);
                student_managing.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Balance":
                let balance_input = await inquirer.prompt([{
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID"
                    }]);
                student_managing.view_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([{
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID"
                    },
                    {
                        type: "number",
                        name: "amount",
                        message: "Enter the amount to pay"
                    }]);
                student_managing.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([{
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID"
                    }]);
                student_managing.show_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.bold.magentaBright("Thank you for using 'Syed Hamail Program' - Student Management System"));
                process.exit();
                break;
        }
    }
}
// Calling a main functuon
main();
