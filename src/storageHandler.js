const getSavedProjects = () => {
    return JSON.parse(localStorage.getItem("projects"));
};

const setSavedProjects = (projectsArray) => {
    localStorage.setItem("projects", JSON.stringify(projectsArray));
};

export {getSavedProjects, setSavedProjects};