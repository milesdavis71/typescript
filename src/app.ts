function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const origMethodValue = descriptor.value;
  const modDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = origMethodValue.bind(this);
      return boundFn;
    },
  };
  return modDescriptor;
}

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
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputelement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputelement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputelement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
    this.attach();
  }

  @Autobind
  submitHandler(event: Event) {
    event.preventDefault();

    console.log(this.titleInputelement.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
