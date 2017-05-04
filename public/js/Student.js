function Student (name, surname, birth, marks) {
	var id = id,
		name = name,
		surname = surname,
		birth = birth,
		marks = marks;
		
	Object.defineProperty(this, 'id', {
		get: function() {
		  return id;
		},
		set: function(value) {
		  if (!value) {
			throw new Error('id can\'t be null.');
			alert('id can\'t be null.');
		  }
		  id = value;
		},
		enumerable: true
    });
	
	Object.defineProperty(this, 'name', {
		get: function() {
		  return name;
		},
		set: function(value) {
		  if (!value) {
			throw new Error('name can\'t be null.');
			alert('name can\'t be null.');
		  }
		  name = value;
		},
		enumerable: true
    });
  
  	Object.defineProperty(this, 'surname', {
		get: function() {
		  return surname;
		},
		set: function(value) {
		  if (!value) {
			throw new Error('surname can\'t be null');
		  }
		  surname = value;
		},
		enumerable: true
    });
  
  	Object.defineProperty(this, 'birth', {
		get: function() {
		  return birth;
		},
		set: function(value) {
		  if (!value || isNaN(value)) {
			throw new Error('There should be a number!');
		  }
		  birth = value;
		},
		enumerable: true
    });
  
  	Object.defineProperty(this, 'marks', {
		get: function() {
		  return marks;
		},
		set: function(value) {
		  if (!value || isNaN(value)) {
			throw new Error('There should be a number!');
		  }

		  marks = value;
		},
		enumerable: true
    });
	
	this.toString = function () {
			return this.name + ' ' + this.surname + ", " + this.getAge()
			+ ', marks: ' + this.marks;
	};
	
	this.toJSON = function(){
		return JSON.stringify({
			id: this.id,
			name: this.name,
			surname : this.surname,
			birth : this.birth,
			marks : this.marks
		});  
	}
	
	this.getAge = function () {
	    return new Date().getFullYear() - this.birth;
	};
	
	return this;
}


