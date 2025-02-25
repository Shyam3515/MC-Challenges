class Employee {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  say() {
    console.log(`Hi, I'm ${this.name} and I'm a ${this.type}`);
  }
}

class Developer extends Employee {
  constructor(name) {
    super(name, "Developer");
  }
}

class Tester extends Employee {
  constructor(name) {
    super(name, "Tester");
  }
}

class EmployeeFactory {
  create(name, type) {
    switch (type) {
      case 1:
        return new Developer(name);

      case 2:
        return new Tester(name);
      default:
        throw new Error("Invalid employee type");
    }
  }
}

//create Instance
const employeeFactory = new EmployeeFactory();
let employees = [
  employeeFactory.create("Shyam", 1),
  employeeFactory.create("Vamsi", 2),
];

// Call method directly (No need for `.call`)
employees.forEach((emp) => emp.say());

/**
 * 🔥 Why is this version better?
✅ Uses ES6 classes → Cleaner and more structured
✅ Removes unnecessary call() → say() is now a built-in method
✅ Handles invalid employee types with an error
✅ Easier to extend → You can add new employee roles effortlessly
 */
