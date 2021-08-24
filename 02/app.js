var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: "pitju",
    age: 50,
    hobbies: ["basketball", "skateboard"],
    role: Role.ADMIN
};
var favoriteActivities;
favoriteActivities = ["basketball", "skateboard"];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    // console.log(hobby.map()); ERROR
}
console.log(Role.ADMIN);
