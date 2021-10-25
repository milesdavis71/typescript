class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputelement: HTMLInputElement;
  descriptionInputelement: HTMLInputElement;
  peopleInputelement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputelement = document.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputelement = document.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputelement = document.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
