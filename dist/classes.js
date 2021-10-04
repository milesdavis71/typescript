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
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('Nincs jelentés.');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Adj át egy megfelelő jelentést');
        }
        this.addReport(value);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
const accounting = new AccountingDepartment('d3', []);
// console.log(accounting.mostRecentReport);
const it = new ITDepartment('d2', ['max']);
it.addEmployee('pityu');
it.addEmployee('gabi');
it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();
console.log(it);
accounting.mostRecentReport = '2021. 09. 30';
accounting.addReport('Valami elromlott.');
accounting.printReports();
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
//# sourceMappingURL=classes.js.map