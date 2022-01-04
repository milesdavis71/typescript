enum ProjectStatus {
  Active,
  Fiished,
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
    return ProjectState;
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
    this.listeners.map(listenerFn => listenerFn(this.projects.slice()));
  }
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostelement: T;
  element: U;

  constructor(
    templateId: string,
    hostid: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostelement = document.getElementById(hostid)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }
  abstract configuration(): void;
  abstract renderContent(): void;

  attach(insertAtBegining: boolean) {
    this.hostelement.insertAdjacentElement(
      insertAtBegining ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.configuration();
    this.renderContent();
  }
  configuration() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  renderContent() {}
  submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
  }

  gatherUserInput() {}
}

const prjInput = new ProjectInput();
