let codigo = localStorage.getItem('id') || 0
let clients = JSON.parse(localStorage.getItem('clients')) || []

// Vetor dos objetos da classe cliente
let clientes = []

// Verificar se as opções de ordenação estão ativas ou não
let isOrderActive = false

// Classe Cliente com todos os atributos
class Cliente {
    constructor(id, name, doc, fat, dateFun, status, alt) {
        this.codigo = id
        this.nome = name
        this.documento = doc
        this.faturamento = fat
        this.dataFundacao = dateFun
        this.ativo = status
        this.dataAlteracao = alt
    }
}

// Função para retornar os dados para serem inseridos na página
const strData = (client) => {
    return (
        `
            <div class="item row">
                <p class="mr robot-font">
                    | ${client.codigo} | 
                    ${client.nome} |
                    ${(client.documento === '') ? '' : `nº ${client.documento} | `} 
                    ${(client.faturamento === '') ? '' : `R$ ${client.faturamento} | `} 
                    ${(client['dataFundacao'] === '') ? '' : `fundação ${client['dataFundacao'].getFullYear()}-${client['dataFundacao'].getMonth()}-${client['dataFundacao'].getDate()} | `} 
                    ${(client['dataAlteracao'] === '') ? '' : `alteração ${client['dataAlteracao'].getFullYear()}-${client['dataAlteracao'].getMonth()}-${client['dataAlteracao'].getDate()}`} 
                </p>
                <p id="${client.codigo}" class="remove robot-font">
                    Remover
                </p>
            </div>
        `)
}

// Função para retornar os inputs para colocar os dados de parâmetro da função ordenação
const strOrder = () => {
    return (
        `
            <form id="order">
                <div class="center direction">
                    <div class="center mt">
                        <div>
                            <p class="p-text p-margin  robot-font">Faturamento</p>
                            <input type="number" id="order-fat" class="robot-font input-double mb mt" name="fat" placeholder="faturamento" required>
                        </div>
                        <div>
                            <p class="p-text p-margin  robot-font">data de fundação</p>
                            <input type="date" id="order-date" class="robot-font input-double mb" name="date-alt" required>
                        </div>
                    </div>
                    <div class="center mt mb">
                        <button type="button" value="cancel" class="button buttonOrder robot-font cancel">Voltar</button>
                        <button type="submit" value="search" class="button buttonOrder robot-font search">Ordenar</button>
                    </div>
                </div>     
            </form>
        `
    )
}

// Função para transformar o objeto do localStorage em um objeto
const toClientes = (id, name, doc, fat, dateFun, status, alt) => {
    return new Cliente(id, name, doc, fat, dateFun, status, alt)
}

// Função para carregar os dados de todos os objetos na página
$(document).ready(() => {
    clients.map(client => {
        let alteracao = new Date(client['date-alt'])
        let fundacao = new Date(client['date-fun'])
        clientes.push(toClientes(client.id, client.name, client.doc, client.fat, fundacao, client.status, alteracao))
    })
    clientes.map(client => {
        $("#data").append(strData(client))
    })
})

// Função do botão remover
$(document).ready(() => {
    $("#data").on('click', '.remove', (e) => {
        const idDelete = e.target.attributes.id.value
        console.log(idDelete)
        clients = clients.filter(client => client.id != idDelete)
        localStorage.setItem('clients', JSON.stringify(clients))
        window.location.reload()
    })
})

// Função de adicionar um novo cadastro
$(document).ready(() => {
    $(".new").on('click', () => {
        window.location.href = 'index.html'
    })
})

// Função para ordenar e mostrar os dados na tela
const orderByFoundAndFat = (foundation, revenues) => {
    const dateFoundation = new Date(foundation)
    let orderClients = clientes.filter(client => client.faturamento >= revenues && client.dataFundacao > dateFoundation)
    orderClients = orderClients.sort((a, b) => b.dataAlteracao - a.dataAlteracao)
    $("#data").empty()
    if (!orderClients.length) {
        $("#data").append('<p class="mr robot-font">Nenhum dado foi encontrado com esses parâmetros :(</p>')
        return
    }
    orderClients.map(client => {
        $("#data").append(strData(client))
    })
}

// Função para colocar os dados de parâmetro para a função ordenar
$(document).ready(() => {
    $(".order").on('click', () => {
        if (!isOrderActive) {
            $("#orderBy").append(strOrder)
            isOrderActive = true
        }
    })
})

// Função do botão voltar do ordenar
$(document).ready(() => {
    $("#orderBy").on('click', '.cancel', () => {
        if (isOrderActive) {
            $("#orderBy").empty()
            isOrderActive = false
        }
    })
})

// Função do botão ordenar
$(document).ready(() => {
    $("#orderBy").on('submit', '#order', (e) => {
        e.preventDefault()
        orderByFoundAndFat($("#orderBy").find("#order-date").val(), $("#orderBy").find("#order-fat").val())
        if (isOrderActive) {
            $("#orderBy").empty()
            isOrderActive = false
        }
    })
})

// Função dos 10 maiores faturamentos
$(document).ready(() => {
    $(".top").on('click', () => {
        let topClients = clientes.sort((a, b) => b.faturamento - a.faturamento)
        topClients = topClients.slice(0, 10)
        $("#data").empty()
        topClients.map(client => {
            $("#data").append(strData(client))
        })
    })
})