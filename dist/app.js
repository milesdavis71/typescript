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
        // console.log(`Munkavállalók száma: ${this.employees.length}`);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
}
const it = new ITDepartment('d2', ['max']);
it.addEmployee('pityu');
it.addEmployee('gabi');
it.describe();
it.printEmployeeInformation();
console.log(it);
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'IT');
        this.reports = reports;
    }
    addReport(text) {
        this.reports.push(text);
    }
    printReports() {
        console.log(this.reports);
    }
}
//# sourceMappingURL=app.js.map