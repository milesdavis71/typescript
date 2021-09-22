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
const accounting = new Department('d1', 'Accounting');

accounting.addEmployee('pityu');
accounting.addEmployee('gabi');
// accounting.employees[2] = 'Huhu';
accounting.describe();
accounting.printEmployeeInformation();
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
