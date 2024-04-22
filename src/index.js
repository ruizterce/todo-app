import './style.css';
import Project from './project.js';
import Todo from './todo.js';
import {loadTodo, loadProject} from './DOMHandler.js'

const contentDiv = document.querySelector('#content');

//Methods test
//Create a new project
const project1 = new Project('Project 1');
//Create a new todo and add it to the project
const todo1 = new Todo('Hey','Desc','12-07-2024','low');
project1.addTodo(todo1);
//Load the project into the DOM
contentDiv.appendChild(loadProject(project1));