const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

$(".decode").on('click', () => {
    $(".input-text").val(decode64($(".input-text").val()))
})

$(".code").on('click', () => {
    $(".input-text").val(btoa($(".input-text").val()))
})

const binToDec = (bstr) => {
    return parseInt((bstr + '')
        .replace(/[^01]/gi, ''), 2)
}

const codeToBin = (text) => {
    let numToBin = ''

    for (let i = 0; i < 4; i++) {
        let char = text[i]
        char = base64.indexOf(char)
        char = char.toString(2)
        if (char.length % 6 === 0) {
            numToBin += char
        } else {
            let rest = 6, newChar = ''
            rest -= char.length
            for (let i = 0; i < rest; i++)
                newChar += '0'
            newChar += char
            numToBin += newChar
        }
    }

    return numToBin
}

const binDecodedToChar = (numToBin) => {
    let textConverted = []

    for (let i = 0; i < 3; i++) {
        let dec = ''
        for (let j = 0; j < 8; j++) {
            dec += numToBin[j]
        }
        dec = binToDec(dec)
        let char = String.fromCharCode(dec)
        if (char !== '')
            textConverted.push(char)
        numToBin = numToBin.substring(8, numToBin.length)
    }

    return textConverted
}

const decode64 = (textInBase64) => {
    const text = textInBase64.split('')
    let i = 0, textConverted = []

    if (text.length < 4)
        for (let j = text.length; j < 4; j++)
            text.push('=')

    for (let i = 0; i < text.length; i += 4) {
        let partOfTheText = text.slice(i, i + 4)
        let binDecoded = codeToBin(partOfTheText)
        textConverted.push(...binDecodedToChar(binDecoded))
    }
    
    if (textConverted[textConverted.length - 1] === '')
        textConverted.pop()

    if (textConverted[textConverted.length - 1] === ' ')
        textConverted.pop()

    return textConverted.join('')
}