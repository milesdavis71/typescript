type Admin = {
  name: string;
  privileges: string[];
};

type Emloyee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Emloyee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create server'],
  startDate = new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Number;
