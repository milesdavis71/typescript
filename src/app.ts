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
    console.log(`Munkavállalók száma: ${this.employees.length}`);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string) {
    super('id', 'IT');
  }
}
const accounting = new ITDepartment('d2');

accounting.addEmployee('pityu');
accounting.addEmployee('gabi');
accounting.name = 'Huhu';
accounting.printEmployeeInformation();
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
