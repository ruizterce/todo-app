export default class Project{
    constructor(title, projectList){
        this.title = title;
        this.todos = [];
        projectList.addProject(this);
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todo){
        this.todos = this.todos.filter(e => e !== todo);       
    }
    
}