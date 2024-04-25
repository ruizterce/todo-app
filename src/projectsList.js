import {setSavedProjects} from "./storageHandler";

export default class ProjectsList{
    constructor(array){
        this.projects = []
    }


    addProject(project){
        this.projects.push(project);
        this.saveList();
    }

    removeProject(project){
        this.projects = this.projects.filter(e => e !== project);
        this.saveList();
    }

    saveList(){
        setSavedProjects(this.projects);
    }
}