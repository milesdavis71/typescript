// class ProjectInput_ {
//   constructor(parameters) {}
// }

class ProjectState_ {
  private projects: any[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState_;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState_();
      return this.instance;
    }
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, desc: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      desc: desc,
      people: numOfPeople,
    };
    console.log(newProject);

    this.projects.push(newProject);

    this.listeners.map(listenerFn => listenerFn(this.projects.slice()));
  }
}
const projectStateInstance = ProjectState_.getInstance();

function autobind_(_: any, _2: string, descriptor: PropertyDescriptor) {
  const origMethod = descriptor.value;
  const modDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = origMethod.bind(this);
      return boundFn;
    },
  };
  return modDescriptor;
}

interface Validatable_ {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate_(validatableInput: Validatable_) {
  let isValid = true;
  if (validatableInput.required)
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.max;
  }

  return isValid;
}

class ProjectList_ {
  template: HTMLTemplateElement;
  host: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: 'active' | 'finished') {
    this.template = document.querySelector(
      '#project-list'
    )! as HTMLTemplateElement;
    this.host = document.querySelector('#app')! as HTMLDivElement;
    this.assignedProjects = [];
    const importNode = document.importNode(this.template.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = `${type}-projects`;
    projectStateInstance.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const prjList = document.querySelector(
      // *****************************************
      // Ha nincs renderContent, akkor itt azt írja, hogy ez a this ez null
      `#${this.type}-projects`
    ) as HTMLUListElement;

    const prjInList = this.assignedProjects
      .map(assProject => `<li>${assProject.title}</li>`)
      .join('');
    prjList.innerHTML = `<ul>${prjInList}</ul>`;
  }

  renderContent() {
    const listId = `${this.type}-projects`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  attach() {
    this.host.insertAdjacentElement('beforeend', this.element);
  }
}

class ProjectInput_ {
  template: HTMLTemplateElement;
  host: HTMLDivElement;
  element: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    this.template = document.querySelector(
      '#project-input'
    )! as HTMLTemplateElement;

    this.host = document.querySelector('#app')! as HTMLDivElement;
    const importNode = document.importNode(this.template.content, true);

    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInput = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value;

    const enteredDescription = this.descriptionInput.value;

    const enteredPeople = this.peopleInput.value;

    const titleValidatable: Validatable_ = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable_ = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable_ = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate_(titleValidatable) ||
      !validate_(descriptionValidatable) ||
      !validate_(peopleValidatable)
    ) {
      return alert('Huhu');
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  private clearInputFields() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }
  @autobind_
  private submitHandler(e: Event) {
    e.preventDefault();
    const inputUser = this.gatherUserInput();
    if (Array.isArray(inputUser)) {
      const [title, disc, people] = inputUser;
      projectStateInstance.addProject(title, disc, people);
      this.clearInputFields();
    }
  }
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.host.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput_ = new ProjectInput_();
const active_ = new ProjectList_('active');
const finished_ = new ProjectList_('finished');
