// --------------- DDL Command ---------------
use("universityDB");  
db.createCollection("students");  


// --------------- DML Command ---------------
db.students.deleteMany({});

db.students.insertMany([
  { name: "Aman", age: 20, major: "Physics" },
  { name: "Sara", age: 21, major: "Chemistry" }
]);  

db.students.updateOne(
  { name: "Aman" },
  { $set: { age: 22 } }
);  

db.students.find();


// --------------- DCL Command ---------------
use("admin");

db.dropUser("facultyAdmin");

db.createUser({
  user: "facultyAdmin",
  pwd: "secure123",
  roles: [{ role: "readWrite", db: "universityDB" }]
});

