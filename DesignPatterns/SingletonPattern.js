/**
 * The Singleton pattern allows you to limit the number of instances of a particular object to one. This single instance is called the singleton. Singletons reduce the need for global variables which is particularly important in JavaScript because it limits namespace pollution and associated risk of name collisions.
 *
 * UseCase: Lazy Initialization ->	Creates the instance only when it is needed, optimizing performance.
 */

class Singleton {
  constructor() {
    if (!Singleton.instace) {
      this.data = "Hi, new Instance created...";
      Singleton.instace = this;
    }
    return Singleton.instace;
  }

  static getInstance() {
    //this will be executed for the first time;
    //this will enter into the constructor function and returns instance of this, created by first object;
    //from second object creation onwards, directly return statement will execute;
    if (!Singleton.instace) {
      Singleton.instace = new Singleton();
    }
    return Singleton.instace;
  }

  showMessage() {
    console.log(this.data);
  }
}

//creating instances
//for static methods we can call them directly even without creating objects, by using class name
const instace1 = Singleton.getInstance();
const instace2 = Singleton.getInstance();

instace1.showMessage();
instace2.showMessage();

console.log(instace1 === instace2); //true

/**
 * ✅ When to Use the Singleton Pattern?
✔ When you need only one instance of a class throughout the application.
✔ When you need a shared resource (e.g., a database connection, configuration settings, a logger).


🏆 Key Takeaways
🔹 Ensures a single instance is created and reused.
🔹 Helps manage shared resources like configuration, logging, and caching.
🔹 Encapsulation ensures the instance cannot be directly modified.
 */
