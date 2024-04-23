import './style.css';
import Project from './project.js';
import Todo from './todo.js';
import { loadTodo, loadProject, createTodoPopup, loadProjectList } from './DOMHandler.js'

const contentDiv = document.querySelector('#content');
const nav = document.querySelector('nav');
const projects = [];

//Methods test
//Create a new project
const project1 = new Project('Project 1', projects);
//Create a new todo and add it to the project
const todo1 = new Todo('Hey', 'Desc', '12-07-2024', 'low');
project1.addTodo(todo1);

//Load the project list into the nav bar
loadProjectList(nav, projects);
//Load the project into the DOM
loadProject(contentDiv, projects[0]);