var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;

app.post('/save', function(req, res) {
    var table = JSON.stringify(req.body);
	fs.writeFile(__dirname + '/public/table.json', table, function(err){
		if(err){
			res.statusCode = 500;
			res.send = ("error");
			return;
		}
		res.send("success");
	});
});

app.get('/print', function(req, res) {
	fs.readFile(__dirname + '/public/table.json', function(err, data){
		if(err){
			res.statusCode = 404;
			res.send = ("error");
			return;
		}
		res.send(JSON.parse(data));
	});
});



app.delete('/delete/:id', function(req, res) {
	var data = req.body.students;
	var id = req.params.id;
	var found = false;

	    data.forEach(function(item, index) {
	        if (!found && JSON.parse(item).id === Number(id)) {
	            data.splice(index, 1);
	        }
	    });

	    res.send(data);
	});
	
app.put('/edit/:id', function(req, res) {
    var id = req.params.id,
		data = req.body.students,
		newName = req.body.newName,
		newSurname = req.body.newSurname,
		newBirth = req.body.newBirth,
		newMarks = req.body.newMarks;

    var found = false;
	
	data.forEach(function(item, index) {
	    if (!found && JSON.parse(item).id === Number(id)) {
	        JSON.parse(item).name = newName;
			JSON.parse(item).surname = newSurname;
			JSON.parse(item).birth = newBirth;
			JSON.parse(item).marks = newMarks;
	    }
	});

	res.send(data);

});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
