export default class Project{
    constructor(title){
        this.title = title;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todo){
        this.todos = this.todos.filter(e => e !== todo);       
    }
    
}