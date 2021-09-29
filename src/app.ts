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
  admins: string[];
  constructor(id: string, admins: string[]) {
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
