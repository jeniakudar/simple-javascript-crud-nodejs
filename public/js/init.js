(function init(){
	
	var	academicGroup = new AcademicGroup(123);
	
	function getStudent(){
		var newId = new Date().getMilliseconds(),
			student = new Student();
		student.id = newId;
		student.name = document.getElementById('studentName').value;
		student.surname = document.getElementById('studentSurname').value;
		student.birth = document.getElementById('studentBirth').value;
		student.marks = document.getElementById('studentMarks').value;
		return student;
	}
	
	function addButton(){
		academicGroup.add(getStudent());
		document.getElementById('studentName').value = '';
		document.getElementById('studentSurname').value = '';
		document.getElementById('studentBirth').value = '';
		document.getElementById('studentMarks').value = '';
		addToTable();
	}
	
	function addToTable(){
		var	pattern = '{{#students}}<tr id={{id}}><td>{{name}}</td><td>{{surname}}</td>\
				<td>{{getAge}}</td><td>{{marks}}</td>\
				<td><input type="button" class="editButton" value="Edit">\
				<input type="button" class="deleteButton" value="Delete"></td></tr>{{/students}}';
		getTable().innerHTML = Handlebars.compile(pattern)(academicGroup);
		addListeners();
	}
		
	function editRow(){	
		var	newRow = '<td><input type="text" class="name" value=""></td>\
			<td><input type="text" class="surname" value=""></td>\
				<td><input type="text" class="birth" value=""></td>\
				<td><input type="text" class="marks" value=""></td>\
				<td><input type="button" class="saveButton" value="Save"></td>',
			tr = $(this).closest('tr'),
			id = tr.attr('id');
		tr.html(newRow);
		academicGroup.students.forEach(function(item) {
	        if (item.id === Number(id)) {
				tr.find('.name').val(`${item.name}`);
				tr.find('.surname').val(`${item.surname}`);
				tr.find('.birth').val(`${item.birth}`);
				tr.find('.marks').val(`${item.marks}`);
	        }
	    });
		saveButtons = document.getElementsByClassName('saveButton');
		for(var i = 0; i < saveButtons.length; i++){
			saveButtons[i].addEventListener('click', saveRow, false);
		}		
        
	};
	
	function saveRow(){
		var tr = $(this).closest('tr'),
			id = tr.attr('id');
		academicGroup.students.forEach(function(item) {
	        if (item.id === Number(id)) {
				item.name = tr.find('.name').val();
				item.surname = tr.find('.surname').val();
				item.birth = tr.find('.birth').val();
				item.marks = tr.find('.marks').val();
	        }
	    });
		addToTable();
		/*
		var newName = tr.find('.name').val(),
			newSurname = tr.find('.surname').val();
			newBirth = tr.find('.birth').val();
			newMarks = tr.find('.marks').val();
		 
        $.ajax({
            url: '/edit/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ students: academicGroup.students;
								   newName: newName,
								   newSurname : newSurname,
								   newBirth : newBirth,
								   newMarks: newMarks}),
            success: function(response) {
                resetTable();				
				response.students.forEach(function(item){   
				var student = new Student();
				student.name = JSON.parse(item).name;
				student.surname = JSON.parse(item).surname;
				student.birth = JSON.parse(item).birth;
				student.marks = JSON.parse(item).marks;
				academicGroup.add(student);
				});
				//console.log(academicGroup.toString());
				addToTable();
                console.log(response);
            }
        });*/
	};
	
	function deleteRow(){
		var data = academicGroup.toJSON(),
			id = $(this).closest('tr').attr('id');	
		academicGroup.students.forEach(function(item, index) {
	        if (item.id === Number(id)) {
	            academicGroup.remove(index);
	        }
	    });
		addToTable();	
     /*   $.ajax({
            url: '/delete/' + id,
            method: 'DELETE',
            contentType: 'application/json',
			data: data,
            success: function(response) {
				resetTable();
				
				response.forEach(function(item){  
				var student = new Student();				
				student.name = JSON.parse(item).name;
				student.surname = JSON.parse(item).surname;
				student.birth = JSON.parse(item).birth;
				student.marks = JSON.parse(item).marks;
				academicGroup.add(student);
				});
				//console.log(academicGroup.toString());
				addToTable();
                console.log(response);
            }
        });*/
	};
	
	function saveTable(){
		var data = academicGroup.toJSON();
        $.ajax({
            url: '/save',
            method: 'POST',
            contentType: 'application/json',
			data: data,
            success: function(response) {
                console.log(response);
            }
        });
	};
	
	function printTable(){
        $.ajax({
            url: '/print',
            success: function(response) {
				resetTable();				
				response.students.forEach(function(item){ 
				var student = new Student();				
				student.name = JSON.parse(item).name;
				student.surname = JSON.parse(item).surname;
				student.birth = JSON.parse(item).birth;
				student.marks = JSON.parse(item).marks;
				academicGroup.add(student);
				});
				//console.log(academicGroup.toString());
				addToTable();
                console.log(response);
            }
        });
	};
	
	function getTable(){
		return document.getElementById('tableBody');
	}
	
	function resetTable(){
		getTable().innerHTML = '';
		academicGroup.destroy();
	}
	
	function addListeners(){
		var editButtons = document.getElementsByClassName('editButton'),
		deleteButtons = document.getElementsByClassName('deleteButton');
		
		for(var i = 0; i < editButtons.length; i++){
			editButtons[i].addEventListener('click', editRow, false);
			deleteButtons[i].addEventListener('click', deleteRow, false);
		}			
	}
	
	document.getElementById('resetButton')
		.addEventListener('click', resetTable, false);
		
	document.getElementById('addButton')
		.addEventListener('click', addButton, false);
		
	document.getElementById('saveButton')
		.addEventListener('click', saveTable, false);
		
	document.getElementById('printButton')
		.addEventListener('click', printTable, false);
	
})();