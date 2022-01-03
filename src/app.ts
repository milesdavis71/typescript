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
  private constructor() {
    super();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProjects(title: string, desc: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random.toString(),
      title,
      desc,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.listeners.map(listenerFn => listenerFn(this.projects.slice()));
  }
}

const prjStateInstance = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateId: string, hostId: string) {
    this.templateElement = document.querySelector(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector(hostId)! as T;
    const importedNode = document.importNode(this.templateElement, true);
    this.element = importedNode.firstElementChild as U;
  }

  abstract renderContent(): void;
  abstract configuration(): void;
}
