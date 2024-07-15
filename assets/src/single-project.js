function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadProject(projectName) {
    fetch('data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const project = data.portfolio[projectName][0];
            if (project) {
                document.getElementById('name').innerHTML = project.name;
                document.getElementById('description').innerHTML = project.description;
                document.getElementById('overview').innerHTML = project.overview;
                document.getElementById('image').src = project.image;
                document.getElementById('image-link').href = project.image;
                document.getElementById('link').href = project.link;
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
