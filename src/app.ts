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
    insertAtStart: boolean,
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

    this.attach(insertAtStart);
  }

  abstract configuration(): void;
  abstract renderContent(): void;

  attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `#${type}-projects`);
    this.assignedProjects = [];

    this.configuration();
    this.renderContent();
  }

  configuration() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
    });
  }
  renderContent() {}
  renderprojec() {}
}

class ProejctInput extends Component<HTMLDivElement, HTMLFormElement> {
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
  }
  configuration() {}
  renderContent() {}
}

const prjInput = new ProejctInput();
