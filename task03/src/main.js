import api from './api'

class repoList {
    constructor() {
        this.repositories = [];
        this.formEl = document.getElementById('997');
        this.ulEl = document.getElementById('331');
        this.inputEl = document.querySelector('input');
        this.registerRepo();
    }

    registerRepo() {
        this.formEl.onsubmit = event => this.addRepo(event);
    }

    renderRepo() {
        let repoRender = this.repositories[this.repositories.length - 1]

        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', repoRender.avatar_url);

        let strongEl = document.createElement('strong');
        strongEl.appendChild(document.createTextNode(repoRender.name));

        let pEl = document.createElement('p');
        pEl.appendChild(document.createTextNode(repoRender.description));

        let aEl = document.createElement('a');
        aEl.setAttribute('target', '_blank');
        aEl.setAttribute('href', repoRender.html_url);
        aEl.appendChild(document.createTextNode('Acesse Aqui'));

        let liEl = document.createElement('li');
        liEl.appendChild(imgEl);
        liEl.appendChild(strongEl);
        liEl.appendChild(pEl);
        liEl.appendChild(aEl);

        this.ulEl.appendChild(liEl);
    }
    setLoading(status = true){
        if(status){
            let spanEl = document.createElement('span');
            spanEl.appendChild(document.createTextNode('Loading...'));
            spanEl.setAttribute('id', 'loading');

            this.formEl.appendChild(spanEl);
        }
        else {
            document.getElementById('loading').remove();
        }
    }

    async addRepo(event) {
        event.preventDefault();

        if(this.inputEl.value.length === 0) {
            return alert('Digite um endereço para algum repositório no github');
        }
        this.setLoading();
        try{
            const res = await api.get(`/repos/${this.inputEl.value}`);
            const { name, description, html_url, owner: { avatar_url } } = res.data;

            this.repositories.push({
                avatar_url,
                name, 
                description,
                html_url, 
            });
            await setTimeout(() => { return }, 3000);
            this.renderRepo();
        } catch (err){
            alert('Repositorio não existe!');
        }
        this.setLoading(false);
    }

}
new repoList();