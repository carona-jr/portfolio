const areaQuiz = document.querySelector('#area-quiz');
const btnProximo = document.querySelector('#btn-proximo');
const btnVerificar = document.querySelector('#btn-verificar');
const btn = document.querySelector('#btn');
const date = document.querySelector('#date');
let numQuiz = 0, totalResultado = 0, idade = 2100;

let quiz = [
    {
        pergunta: 'Qual é o ano da promulgação da Constituição Federal do Brasil?',
        a: '1987',
        b: '1988',
        c: '1989',
        d: '1990',
        resposta: '1988'
    },
    {
        pergunta: 'Quando o Brasil foi descoberto / achado?',
        a: '1500',
        b: '1490',
        c: '1510',
        d: '1501',
        resposta: '1500'
    },
    {
        pergunta: 'Quem foi o pai da aviação no Brasil?',
        a: 'Saint Domont',
        b: 'Santos Domingues',
        c: 'Santos Dumont',
        d: 'Santo Dumon',
        resposta: 'Santos Dumont'
    },
];

function criaTituloPergunta(indiceArr) {
    let tituloPergunta = document.createElement('h2');
    tituloPergunta.appendChild(document.createTextNode(quiz[indiceArr].pergunta));
    areaQuiz.appendChild(tituloPergunta);
};

function criaResultado() {
    let textoResultado = document.createElement('h2');
    textoResultado.appendChild(document.createTextNode(`Parabéns, você acertou ${totalResultado} respostas!!!`));
    areaQuiz.appendChild(textoResultado);
};

function criaAlternativa(indiceArr, e) {
    let label = document.createElement('label');
    let inputQuiz = document.createElement('input');
    inputQuiz.setAttribute('type', 'radio');
    inputQuiz.setAttribute('name', 'quiz');
    label.appendChild(inputQuiz);
    switch (e) {
        case 'a':
            inputQuiz.setAttribute('value', quiz[indiceArr].a);
            label.appendChild(document.createTextNode(quiz[indiceArr].a));
            break;
        case 'b':
            inputQuiz.setAttribute('value', quiz[indiceArr].b);
            label.appendChild(document.createTextNode(quiz[indiceArr].b));
            break;
        case 'c':
            inputQuiz.setAttribute('value', quiz[indiceArr].c);
            label.appendChild(document.createTextNode(quiz[indiceArr].c));
            break;
        case 'd':
            inputQuiz.setAttribute('value', quiz[indiceArr].d);
            label.appendChild(document.createTextNode(quiz[indiceArr].d));
            break;
    }
    areaQuiz.appendChild(label);
};

btnProximo.onclick = function () {
    if (idade == 2100) {
        let data = date.value;
        let ano = [];
        for (let i = 0; i < 4; i++) {
            ano[i] = data[i];
        }
        idade = ano.join('');
    }
    if (idade <= 2009 && numQuiz >= 0) {
        if(idade == '')
            return;
        if (numQuiz < quiz.length) {
            areaQuiz.innerHTML = '';
            criaTituloPergunta(numQuiz);
            criaAlternativa(numQuiz, 'a');
            criaAlternativa(numQuiz, 'b');
            criaAlternativa(numQuiz, 'c');
            criaAlternativa(numQuiz, 'd');
            numQuiz++;
        }
        else {
            areaQuiz.innerHTML = '';
            btn.innerHTML = '';
            criaResultado();
        }
    } else{
        alert('Idade errada');
    }
};

btnVerificar.onclick = function () {
    let quizAtual = numQuiz - 1;
    if (verificaAlternativa() === quiz[quizAtual].resposta) {
        if (quizAtual === totalResultado)
            totalResultado++;
    }
};

function verificaAlternativa() {
    let quizAtual = numQuiz - 1;
    let radio = document.getElementsByName('quiz');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
    alert('Selecione uma resposta primeiro');
};