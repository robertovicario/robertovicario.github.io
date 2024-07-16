function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadProject(projectName) {
    fetch('data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const projects = Object.keys(data.portfolio);
            const currentIndex = projects.indexOf(projectName);

            if (currentIndex !== -1) {
                const project = data.portfolio[projectName][0];
                document.getElementById('name').innerHTML = project.name;
                document.getElementById('description').innerHTML = project.description;
                document.getElementById('overview').innerHTML = project.overview;
                document.getElementById('image').src = project.image;
                document.getElementById('image-link').href = project.image;
                document.getElementById('link').href = project.link;

                const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
                const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;

                const prevProjectName = projects[prevIndex];
                const nextProjectName = projects[nextIndex];

                document.getElementById('link-prev').href = `/single-project.html?project=${prevProjectName}`;
                document.getElementById('link-next').href = `/single-project.html?project=${nextProjectName}`;
            }
        })
        .catch(e => {
            console.error(e);
            window.location.href = '/404';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const projectName = getQueryParams('project');
    if (projectName) {
        loadProject(projectName);
    }
});
