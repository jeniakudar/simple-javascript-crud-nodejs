// Определяем конструктор Person
var Person = function(firstName) {
  this.firstName = firstName;
};

// Добавляем пару методов в Person.prototype
Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};

// Определяем конструктор Student
function Student(firstName, subject) {
  // Вызываем конструктор родителя, убедившись (используя Function#call)
  // что "this" в момент вызова установлен корректно
  Person.call(this, firstName);

  // Инициируем свойства класса Student
  this.subject = subject;
};

// Создаём объект Student.prototype, который наследуется от Person.prototype.
// Примечание: Рспространённая ошибка здесь, это использование "new Person()", чтобы создать
// Student.prototype. Это неверно по нескольким причинам, не в последнюю очередь
// потому, что нам нечего передать в Person в качестве аргумента "firstName"
// Правильное место для вызова Person показано выше, где мы вызываем 
// его в конструкторе Student.
Student.prototype = Object.create(Person.prototype); // Смотрите примечание выше

// Устанавливаем свойство "constructor" для ссылки на класс Student
Student.prototype.constructor = Student;

// Заменяем метод "sayHello"
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying "
              + this.subject + ".");
};

// Добавляем метод "sayGoodBye"
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// Пример использования:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Проверяем, что instanceof работает корректно
console.log(student1 instanceof Person);  // true 
console.log(student1 instanceof Student); // true