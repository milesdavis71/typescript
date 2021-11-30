"use strict";
// class ProjectInput_ {
//   constructor(parameters) {}
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState_ {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState_();
            return this.instance;
        }
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, desc, numOfPeople) {
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
function autobind_(_, _2, descriptor) {
    const origMethod = descriptor.value;
    const modDescriptor = {
        configurable: true,
        get() {
            const boundFn = origMethod.bind(this);
            return boundFn;
        },
    };
    return modDescriptor;
}
function validate_(validatableInput) {
    let isValid = true;
    if (validatableInput.required)
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.max;
    }
    return isValid;
}
class ProjectList_ {
    constructor(type) {
        this.type = type;
        this.template = document.querySelector('#project-list');
        this.host = document.querySelector('#app');
        this.assignedProjects = [];
        const importNode = document.importNode(this.template.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = `${type}-projects`;
        projectStateInstance.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const prjList = document.querySelector(
        // *****************************************
        // Ha nincs renderContent, akkor itt azt írja, hogy ez a this ez null
        `#${this.type}-projects`);
        const prjInList = this.assignedProjects
            .map(assProject => `<li>${assProject.title}</li>`)
            .join('');
        prjList.innerHTML = `<ul>${prjInList}</ul>`;
    }
    renderContent() {
        const listId = `${this.type}-projects`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.host.insertAdjacentElement('beforeend', this.element);
    }
}
class ProjectInput_ {
    constructor() {
        this.template = document.querySelector('#project-input');
        this.host = document.querySelector('#app');
        const importNode = document.importNode(this.template.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInput = this.element.querySelector('#title');
        this.descriptionInput = this.element.querySelector('#description');
        this.peopleInput = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate_(titleValidatable) ||
            !validate_(descriptionValidatable) ||
            !validate_(peopleValidatable)) {
            return alert('Huhu');
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputFields() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    submitHandler(e) {
        e.preventDefault();
        const inputUser = this.gatherUserInput();
        if (Array.isArray(inputUser)) {
            const [title, disc, people] = inputUser;
            projectStateInstance.addProject(title, disc, people);
            this.clearInputFields();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.host.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autobind_
], ProjectInput_.prototype, "submitHandler", null);
const prjInput_ = new ProjectInput_();
const active_ = new ProjectList_('active');
const finished_ = new ProjectList_('finished');
//# sourceMappingURL=app_gyak.js.map