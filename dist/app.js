"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // name: string;
        this.employees = [];
    }
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(`Munkavállalók száma: ${this.employees.length}`);
        console.log(this.employees);
    }
}
const accounting = new Department('d1', 'Accounting');
accounting.addEmployee('pityu');
accounting.addEmployee('gabi');
accounting.name = 'Huhu';
accounting.printEmployeeInformation();
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
//# sourceMappingURL=app.js.map