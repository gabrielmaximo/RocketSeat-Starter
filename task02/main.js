var divApp = document.querySelector('#app');
var inputElement = document.querySelector('#app input');

var ulElement = document.createElement('ul');
divApp.appendChild(ulElement);

// this function get a Object List of repositories in API.github.com/users on button click
function getRepo() {
    // get input text to find user repositories in github API
    var login = inputElement.value;

    // clean input text 
    inputElement.value = '';
    ulElement.innerHTML = '';

    // create Element <span>Loading</span> in Dom
    var spanElement = document.createElement('span');
    var spanText = document.createTextNode("Loading...");

    //put Loading msg in Element <span></span> 
    spanElement.appendChild(spanText);
    divApp.appendChild(spanElement);
    
    //HttpXML search user repositories in API.github and put in DOM <ul></ul>
    axios.get(`https://api.github.com/users/${login}/repos`) 
        .then(function(response) {
            divApp.removeChild(spanElement);
            for (const repo of response.data) {
                var liElement = document.createElement('li');
                var liText = document.createTextNode(repo.name);
                
                liElement.appendChild(liText);
                ulElement.appendChild(liElement);
            }
        })
        .catch(function (error) {
            var liElement = document.createElement('li');
            var liText = document.createTextNode(error);
            
            liElement.appendChild(liText);
            ulElement.appendChild(liElement);
        })
}

