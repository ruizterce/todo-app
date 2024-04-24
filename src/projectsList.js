export default class ProjectsList{
    constructor(array){
        this.projects = []
    }


    addProject(project){
        this.projects.push(project);
    }

    removeProject(project){
        this.projects = this.projects.filter(e => e !== project);       
    }
}