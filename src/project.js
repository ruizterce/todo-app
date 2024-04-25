export default class Project{
    constructor(title, projectsList){
        this.title = title;
        this.todos = [];
        projectsList.addProject(this);
    }

    addTodo(todo, projectsList){
        this.todos.push(todo);
        projectsList.saveList();
    }

    removeTodo(todo, projectsList){
        this.todos = this.todos.filter(e => e !== todo);       
        projectsList.saveList();
    }
    
}