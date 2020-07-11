let _id = localStorage.getItem('id') || 0
let clients = JSON.parse(localStorage.getItem('clients')) || []

$(document).ready(() => {
    $("form").submit((e) => {
        e.preventDefault()
        const data = $("form").serialize().split('&')
        data.shift()
        let client = {}
        client.name = $("#name").val()
        data.map(value => {
            let pair = value.split('=')
            console.log(pair[0], pair[1])
            client[pair[0]] = pair[1]
        })
        client.id = _id
        _id++
        clients.push(client)
        localStorage.setItem('clients', JSON.stringify(clients))
        localStorage.setItem('id', _id)
        window.location.href = 'info.html'
    })
})