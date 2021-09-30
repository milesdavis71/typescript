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
  constructor(id: string, private reports: string[]) {
    super(id, 'IT');
  }

  addReport(text: string) {
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
