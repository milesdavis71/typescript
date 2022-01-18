enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listeners<T> = (items: T[]) => void;

class State<T> {
  listeners: Listeners<T>[] = [];
  addListener(listenerFn: Listeners<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }
  static getInsctance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, desc: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  updateListeners() {
    this.listeners.map(listenerFn => listenerFn(this.projects.slice()));
  }
}

const projectState = ProjectState.getInsctance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  temlpateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.temlpateElement = document.querySelector(
      `#${templateId}`
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector(`#${hostId}`)! as T;

    const importedNode = document.importNode(
      this.temlpateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.assign(insertAtStart);
  }
  assign(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  abstract config(): void;
  abstract renderContent(): void;
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.config();
    this.renderContent();
  }
  config() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.innerHTML = `${this.type} projektek`;
  }
  renderProjects() {
    const listUlEl = this.element.querySelector(`#${this.type}-projects-list`);
    const listLiEl = this.assignedProjects
      .map(assPrj => `<li>${assPrj.title}</li>`)
      .join('');
    listUlEl!.innerHTML = `<ul>${listLiEl}</ul>`;
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleField: HTMLInputElement;
  descField: HTMLInputElement;
  peopleField: HTMLInputElement;
  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleField = this.element.querySelector('#title')! as HTMLInputElement;
    this.descField = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleField = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.config();
    this.renderContent();
  }

  config() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
  renderContent() {}
  gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleField.value;
    const enteredDesc = this.descField.value;
    const enteredPeople = this.peopleField.value;
    return [enteredTitle, enteredDesc, +enteredPeople];
  }
  submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    const [title, desc, people] = userInput;
    projectState.addProject(title, desc, people);
  }
}

const projectInput = new ProjectInput();
const projectListActive = new ProjectList('active');
const projectListFinished = new ProjectList('finished');
