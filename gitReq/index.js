const text = document.querySelector('#user-text');
const button = document.querySelector('#btn-search');
const selectUsers = document.querySelector('#users');
let allUsers = [];

// classe para guardar os valores recebidos da API
class User {
    // os valores do construtor são privados para o objeto (Design pattern: data object private)
    constructor({login, avatar_url, html_url, type, name}){
        this._login = login;
        this._avatar_url = avatar_url;
        this._html_url = html_url;
        this._type = type;
        this._name = name;
    }
    get data() {
        return this._login;
    }
}
// Valor idêntico para todos os objetos (Design Pattern: prototype)
User.prototype.type = "user";

text.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        button.click();
    }
});


// cria os elementos de HTML para serem anexadas a página com os valores de cada usuário
const showUsers = ({_login, _avatar_url, _html_url, _type, _name}) => {
    let div = document.createElement('div');
    let a = document.createElement('a');
    let username = document.createElement('h2');
    let p1 = document.createElement('p');
    let img = document.createElement('img');
    let p2 = document.createElement('p');
    a.setAttribute('href', _html_url);
    if(_name){
        let firstName = _name.split(/[\s, ]+/);
        username.innerHTML = firstName[0];
    } else {
        username.innerHTML = "Null";
    }
    p1.innerHTML = _login;
    img.setAttribute('src', _avatar_url);
    p2.innerHTML = _type;
    div.appendChild(a);
    a.appendChild(username);
    a.appendChild(p1);
    a.appendChild(img);
    a.appendChild(p2);
    selectUsers.appendChild(div);
}

const btn = () => {
    // Requisição GET
    var ajax = new XMLHttpRequest();

    // Define a requisição com o seu método e o seu endereço
    ajax.open("GET", `https://api.github.com/users/${text.value}`, true);

    // Envia a requisição
    ajax.send();

    // Cria um evento para receber o retorno.
    ajax.onreadystatechange = () => {
        // Caso dê certo, a requisição retorna 4 e 200
        if (ajax.readyState == 4 && ajax.status == 200) {
            let data = ajax.responseText;
            let user = new User(JSON.parse(data));
            // iterador para percorrer o array inteiro em busca de valores duplicados de 
            // usuários (Design pattern: iterator)
            const duplicateUser = allUsers.find( item => user._login === item._login)
            if(!duplicateUser){
                allUsers.push(user);
                showUsers(allUsers[allUsers.length - 1]);
            }
        }
    };

    text.value = "";
};