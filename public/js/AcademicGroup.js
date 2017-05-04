function AcademicGroup (number) {
	var number = number,
        students = [];
		
	Object.defineProperty(this, 'number', {
		get: function() {
		  return number;
		},
		set: function(value) {
		  if (!value || isNaN(value)) {
			throw new Error('There should be a number.');
		  }
		  number = value;
		},
		enumerable: true
    });
  
  	Object.defineProperty(this, 'students', {
		get: function() {
		  return students;
		},
		set: function(value) {
		  if (!value) {
			throw new Error('Student can\'t be null');
			alert('Student can\'t be null');
		  }
		  students = value;
		},
		enumerable: true
    });

	AcademicGroup.sortByName =  function (students) {  
		return students.sort(function (s1, s2) {  
			if (s1.name < s2.name)
				return(-1);
			if (s1.name > s2.name)
				return(1);
			return(0);
		});	
	};
	
	AcademicGroup.sortByMark = function(students) { 
		return students.sort(function (s1, s2) {  
			if (s1.marks < s2.marks)
				return(-1);
			if (s1.marks > s2.marks)
				return(1);
			return(0);
		});	
	};
	
	this.add = function (students) {
        this.students.push(students);
	};
	
	this.remove = function (index) {
        this.students.splice(index, 1);
	};
	
	this.destroy = function () {
		this.students = [];
	};
	
	this.getItem = function (index) {
        return this.students[index];
    }
	
	this.getStudent = function (newId) {
		var selectedStudent = [];
		this.students.forEach(function(item, index, array) {
	        if (item.id === Number(newId)) {
				selectedStudent.push(item.name, item.surname, item.birth, item.marks);
	        }
		});
		return selectedStudent;
	};
	
	this.showStudents = function(){
		var str = '';
		for (var student in this.students) {
			str += this.students[student] + '\n' + '\t';
		}
		return str;
	};
	
	this.sortByMark = function(){
		return this.students = AcademicGroup.sortByMark(this.students);
	};
	
	this.sortByName = function(){
		return this.students = AcademicGroup.sortByName(this.students);
	};
	
	this.toString = function () {
		return this.number + ": " + this.showStudents();
	};
	
	this.toJSON = function(){
		return JSON.stringify({
			number: this.number,
			students : this.students
		});  
	};
	
	return this;	
}


	

	