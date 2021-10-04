class Department {
  // name: string;
  private employees: string[] = [];

  constructor(private id: string, public name: string) {}
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(`Munkavállalók száma: ${this.employees.length}`);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('Nincs jelentés.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Adj át egy megfelelő jelentést');
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  addReport(text: string) {
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
