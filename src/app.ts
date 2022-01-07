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

type Listener<T> = (items: T[]) => void;

class State<T> {
  listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;
  constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  addProjects(title: string, desc: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  updateListeners() {
    this.listeners.map(listenerFn => listenerFn(this.projects.slice()));
  }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templateId: string,
    hostId: string,
    InsertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.querySelector(
      `#${templateId}`
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector(`#${hostId}`)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(InsertAtStart);
  }
  abstract config(): void;
  abstract renderContent(): void;

  attach(instertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      instertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.config();
    this.renderContent();
  }
  config() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          prj.status === ProjectStatus.Active;
        }
        prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = `${this.type} projektek`;
  }
  renderProjects() {
    const listUlEl = document.querySelector(
      `#${this.type}-projects-list`
    )! as HTMLUListElement;
    const listLiEl = this.assignedProjects
      .map(assPrj => `<li>${assPrj.title}</li>`)
      .join('');
    listUlEl!.innerHTML = listLiEl;
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
  submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProjects(title, desc, people);
    }
  }
  gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleField.value;
    const enteredDesc = this.descField.value;
    const enteredPeople = this.peopleField.value;
    return [enteredTitle, enteredDesc, +enteredPeople];
  }
}

const prjInput = new ProjectInput();
const prjListActive = new ProjectList('active');
const prjListFinished = new ProjectList('finished');
