

class Project {
  constructor(parameters) {
    
  }
}

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
