import './style.css';
import Project from './project.js';
import Todo from './todo.js';
import { loadProject, loadProjectsList } from './DOMHandler.js'
import ProjectsList from './projectsList.js';
import { getSavedProjects } from "./storageHandler";

const contentDiv = document.querySelector('#content');
const nav = document.querySelector('nav');
const projectsList = new ProjectsList([]);

if (!localStorage.getItem("projects")) {
    console.log('No storage found')
    //Create a new example project
    const project1 = new Project('Example Project', projectsList);
    //Create a new example todo and add it to the project
    const todo1 = new Todo('Example Todo', 'Description', '12-23-2024', 'low');
    project1.addTodo(todo1, projectsList);
} else {
    console.log('Loading saved projects')
    projectsList.projects = getSavedProjects(); //Load array containing an object for each saved project
    projectsList.projects.forEach((e) => { //Set prototype of each object and load prototype's methods into it
        Object.setPrototypeOf(e, Project)
        e.addTodo = e.prototype.addTodo;
        e.removeTodo = e.prototype.removeTodo;
    })
}


//Load the project list into the nav bar
loadProjectsList(contentDiv, nav, projectsList);
//Load the project into the DOM
loadProject(contentDiv, projectsList.projects[0], projectsList, nav);