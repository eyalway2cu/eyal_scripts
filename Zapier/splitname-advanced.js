var fullName = input.name.split(' ');
var firstName = fullName.shift();
var lastName = fullName.join(' ');

output = [{firstname: firstName, lastname: lastName}];
