export default class Project{
    constructor(title, array){
        this.title = title;
        this.todos = [];
        array.push(this);
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todo){
        this.todos = this.todos.filter(e => e !== todo);       
    }
    
}