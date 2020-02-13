const btnCod = document.querySelector('#btn-cod');
const btnDec = document.querySelector('#btn-dec');
const textInput = document.querySelector('#text');
const result = document.querySelector('#result');
let text;

// Botao Decodificar
btnDec.onclick = function () {
    text = textInput.value;
    if (text.length !== 0) {
        result.innerHTML = '';
        let p = document.createElement('p');
        p.setAttribute('class', 'mt-2');
        p.setAttribute('class', 'text-center');
        //p.appendChild(document.createTextNode(atob(text))); // <-- função do js para decodicar base64
        p.appendChild(document.createTextNode(decode64(text)));
        result.appendChild(p);
    } else {
        alert('Digite algum texto');
    }
};

// Botao Codificar
btnCod.onclick = function () {
    text = textInput.value;
    if (text.length !== 0) {
        result.innerHTML = '';
        let p = document.createElement('p');
        p.setAttribute('class', 'mt-2');
        p.setAttribute('class', 'text-center');
        p.appendChild(document.createTextNode(btoa(text)));
        result.appendChild(p);
    } else {
        alert('Digite algum texto');
    }
};

// Função da W3 Resources
function binTodec(bstr) {
    return parseInt((bstr + '')
        .replace(/[^01]/gi, ''), 2);
}

function decode64(text64) {
    let base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', i = 0, textConverted = '';
    while (i !== text64.length) {
        let divText = '', numToBin = '';
        if (text64.length % 4 === 0) {
            divText = text64[i] + text64[i + 1] + text64[i + 2] + text64[i + 3];
        } else if (text64.length % 4 === 1){
            divText = text64[i] + text64[i + 1] + text64[i + 2] + '=';
        } else if (text64.length % 4 === 2){
            divText = text64[i] + text64[i + 1] + '=' + '=';
        } else if (text64.length % 4 === 3){
            divText = text64[i] + '=' + '=' + '=';
        } else if (text64.length % 4 === 4){
            divText = '=' + '=' + '=' + '=';
        }
        for (let j = 0; j < 4; j++) {
            let letter = divText[j];
            letter = base64.indexOf(letter);
            letter = letter.toString(2);
            if (letter.length % 6 === 0) {
                numToBin += letter;
            } else {
                let restToComplete = 6, newLetter = '';
                restToComplete -= letter.length;
                for (let j = 0; j < restToComplete; j++)
                    newLetter += '0';
                newLetter += letter;
                numToBin += newLetter;
            }
        }
        for (let j = 0; j < 3; j++) {
            let numDec = '';
            for (let t = 0; t < 8; t++) {
                numDec += numToBin[t];
            }
            numDec = binTodec(numDec);
            let c = String.fromCharCode(numDec);
            textConverted += c;
            numToBin = numToBin.substring(8, numToBin.length);
        }
        console.log(textConverted);
        i += 4;
    }
    return textConverted;
}