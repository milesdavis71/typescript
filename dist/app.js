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
        this.admins = admins;
    }
}
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
const accounting = new AccountingDepartment('d3', []);
const it = new ITDepartment('d2', ['max']);
it.addEmployee('pityu');
it.addEmployee('gabi');
it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();
console.log(it);
accounting.addReport('Valami elromlott.');
accounting.printReports();
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
//# sourceMappingURL=app.js.map