
//Return a DOM element displaying the information of a todo.
const loadTodo = (todo) => {
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

    return container;
}

//Return a DOM element displaying the title of a project and the information of each todo inside it.
const loadProject = (project) => {
    const container = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = project.title;

    container.appendChild(title);

    project.todos.forEach((e) => container.appendChild(loadTodo(e)));

    return container;

}
export { loadTodo, loadProject };