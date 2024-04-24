import Todo from "./todo";
import Project from "./project"

//Create a DOM element displaying the information of a todo and append itself to a parent container.
const loadTodo = (parentContainer, todo) => {
    //Create and append inner elements
    const container = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = todo.title;

    const desc = document.createElement('p');
    desc.textContent = todo.desc;

    const dueDate = document.createElement('p');
    dueDate.textContent = todo.dueDate;

    const priority = document.createElement('p');
    priority.textContent = todo.priority;

    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(dueDate);
    container.appendChild(priority);

    //Append this todo container to a parent container
    parentContainer.appendChild(container);
}

//Create a DOM element displaying the title of a project and the information of each todo inside it, and append itself to a parent container.
const loadProject = (parentContainer, project, projectsList, projectsListContainer) => {

    //Empty parent container
    parentContainer.innerHTML = '';

    //Create container for this project
    const container = document.createElement('div');

    //Create and append title element
    const title = document.createElement('h2');
    title.textContent = project.title;

    container.appendChild(title);

    //Create and append elements for each todo in this project and add a remove button for each one.
    project.todos.forEach((e) => {
        loadTodo(container, e)

        const removeTodoBtn = document.createElement('button');
        removeTodoBtn.textContent = 'Remove Todo'

        removeTodoBtn.addEventListener('click', () => {
            project.removeTodo(e); //Remove todo from the project
            loadProject(parentContainer, project, projectsList, projectsListContainer); //Update project in the DOM
        })

        container.appendChild(removeTodoBtn);
    });

    //Create and append a button that will show formDiv
    const openCreateTodoForm = document.createElement('button');
    openCreateTodoForm.type = 'button';
    openCreateTodoForm.textContent = 'Add Todo';
    openCreateTodoForm.addEventListener('click', () => formDiv.style.display = 'block');
    container.appendChild(openCreateTodoForm);

    //Append this project's container to a parent container
    parentContainer.appendChild(container);

    //Create and append a form to create a todo (hidden by default)
    const formDiv = createTodoForm(parentContainer, project, projectsList, projectsListContainer);

    const removeProjectBtn = document.createElement('button');
    removeProjectBtn.textContent = 'Remove Project';
    removeProjectBtn.addEventListener('click', () => {
        projectsList.removeProject(project);
        loadProjectsList(parentContainer, projectsListContainer, projectsList);
        parentContainer.innerHTML = '';
    })
    parentContainer.appendChild(removeProjectBtn);
}

//Create a form element to add a new todo to a project and append itself to a parentContainer.
const createTodoForm = (parentContainer, project, projectsList, projectsListContainer) => {

    //Create the form element in a div container
    const formDiv = document.createElement('div');
    formDiv.style.display = 'none'; //Hide by default
    formDiv.innerHTML = `
        <form class="form-popup" id = "createTodoForm">
                <h3>Create new Todo</h3>

                <label for="todoTitle"><b>Title</b></label>
                <input type="text" placeholder="Todo title" name="title" id="todoTitle" minlength="3" required>

                <label for="todoDesc"><b>Description</b></label>
                <input type="text" placeholder="Todo description" name="desc" id="todoDesc">

                <label for="todoDueDate"><b>Due Date</b></label>
                <input type="text" placeholder="Todo due date" name="dueDate" id="todoDueDate">

                <label for="todoDesc"><b>Priority</b></label>

                <input type="radio" id="todoPriorityHigh" name="priority" value="high">
                <label for="todoPriorityHigh">High</label><br>
                <input type="radio" id="todoPriorityMedium" name="priority" value="medium" checked>
                <label for="todoPriorityMedium">Medium</label><br>
                <input type="radio" id="todoPriorityLow" name="priority" value="low">
                <label for="todoPriorityLow">Low</label>

                <button type="submit" class="btn" id="createTodoBtn">Create</button>
                <button type="button" class="btn" id="cancelCreateTodoFormBtn">Cancel</button>
        </form>
                `
    parentContainer.appendChild(formDiv);

    const createTodoForm = document.querySelector('#createTodoForm')

    //Confirm creation button
    const createTodoBtn = document.querySelector('#createTodoBtn');
    createTodoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        //Create pointers for each input field in the form
        const todoTitle = document.querySelector('#todoTitle');
        const todoDesc = document.querySelector('#todoDesc');
        const todoDueDate = document.querySelector('#todoDueDate');
        const todoPriority = document.querySelector('input[name="priority"]:checked');

        if (createTodoForm.reportValidity()) { //Check input field validity
            project.addTodo(new Todo(todoTitle.value, todoDesc.value, todoDueDate.value, todoPriority.value)); //Create a new todo in this project from input fields values
            loadProject(parentContainer, project, projectsList, projectsListContainer); //Update project in the DOM
        }
    })

    //Cancel creation, reset and hide the form
    const cancelCreateTodoFormBtn = document.querySelector('#cancelCreateTodoFormBtn');
    cancelCreateTodoFormBtn.addEventListener('click', () => {
        createTodoForm.reset();
        formDiv.style.display = 'none';
    }
    );

    return formDiv;
}

//Create a DOM element displaying a list of projects, and append itself to a parent container.
const loadProjectsList = (contentContainer, parentContainer, projectsList) => {
    //Empty parent container
    parentContainer.innerHTML = '';

    //Create a container for the list
    const container = document.createElement('div');

    //Create and append title element
    const title = document.createElement('h2');
    title.textContent = 'Projects';
    container.appendChild(title);

    //Create and append a list of projects
    const projectsUl = document.createElement('ul');
    projectsList.projects.forEach((e) => {
        const projectLi = document.createElement('li');
        //Add a projectBtn that calls loadProject
        const projectBtn = document.createElement('button');
        projectBtn.type = 'button';
        projectBtn.textContent = e.title;
        projectBtn.addEventListener('click', () => {
            loadProject(contentContainer, e, projectsList, parentContainer);
        });
        projectLi.appendChild(projectBtn);
        projectsUl.appendChild(projectLi);
    })
    container.appendChild(projectsUl);

    //Create and append a button to add a new project
    const addProjectBtn = document.createElement('button');
    addProjectBtn.type = 'button';
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.addEventListener('click', () => {
        addProjectBtn.disabled = true;

        //Create an input element for the project's title
        const projectTitle = document.createElement('input');
        projectTitle.placeholder = 'Project Title';
        container.appendChild(projectTitle);

        //Add a button to confirm project's creation
        const createProjectBtn = document.createElement('button');
        createProjectBtn.type = 'button';
        createProjectBtn.textContent = 'Create';
        createProjectBtn.addEventListener('click', () => {
            const project = new Project(projectTitle.value, projectsList);
            loadProjectsList(contentContainer, parentContainer, projectsList);
        })
        container.appendChild(createProjectBtn);

        //Add a button to cancel project's creation
        const cancelCreateProjectBtn = document.createElement('button');
        cancelCreateProjectBtn.type = 'button';
        cancelCreateProjectBtn.textContent = 'Cancel';
        cancelCreateProjectBtn.addEventListener('click', () => {
            addProjectBtn.disabled = false;
            cancelCreateProjectBtn.remove();
            createProjectBtn.remove();
            projectTitle.remove();
        })
        container.appendChild(cancelCreateProjectBtn);

    })
    container.appendChild(addProjectBtn);

    parentContainer.appendChild(container);
}

export { loadTodo, loadProject, createTodoForm, loadProjectsList };

