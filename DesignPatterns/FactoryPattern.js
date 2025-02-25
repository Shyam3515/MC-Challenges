//A factory pattern is a creational design pattern, that uses factory methods to create objects - rather than by calling a constructor.

//Defining Constructor Functions for Objects
function Developer(name) {
  this.name = name;
  this.type = "Developer";
}

function Tester(name) {
  this.name = name;
  this.type = "Tester";
}

//Implementing the Factory Function
function Employeefactory() {
  this.create = (name, type) => {
    switch (type) {
      case 1:
        return new Developer(name);

      case 2:
        return new Tester(name);
    }
  };
}
//Creating an Instance of the Factory
let employeeFactory = new Employeefactory();
let employees = [];

//Defining a Function to Print Details
function say() {
  console.log(`Hi I'm ${this.name} and I'm  a ${this.type}`);
}

// Creating and Storing Employees, pushing to array
employees.push(employeeFactory.create("Shyam", 1));
employees.push(employeeFactory.create("Vamsi", 2));

//Calling the say Function for Each Employee
employees.map((emp) => say.call(emp));

/**
 * Why Use the Factory Pattern?
✅ Encapsulation → Hides object creation details.
✅ Scalability → Easily add more employee types in the future.
✅ Code Reusability → Centralized object creation logic.
 */
