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
                    ${(client['dataFundacao'] === '') ? '' : `fundação ${client['dataFundacao'].getFullYear()}-${client['dataFundacao'].getMonth() + 1}-${client['dataFundacao'].getDate()} | `} 
                    ${(client['dataAlteracao'] === '') ? '' : `alteração ${client['dataAlteracao'].getFullYear()}-${client['dataAlteracao'].getMonth() + 1}-${client['dataAlteracao'].getDate()}`} 
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
                            <input type="number" step="0.01" min=0 id="order-fat" class="robot-font input-double mb mt" name="fat" placeholder="faturamento" required>
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
        const alteracao = new Date(`${client['date-alt']}T00:00:00`)
        const fundacao = new Date(`${client['date-fun']}T00:00:00`)
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

// Função para filtrar com os parâmetros e ordenar os valores filtrados
const orderByFoundationAndRevenues = (foundation, revenues) => {
    const dateFoundation = new Date(foundation)
    return clientes.filter(client => parseFloat(client.faturamento) >= parseFloat(revenues) && client.dataFundacao > dateFoundation).sort((a, b) => b.dataAlteracao - a.dataAlteracao)
}

// Função do botão ordenar e mostrar na tela
$(document).ready(() => {
    $("#orderBy").on('submit', '#order', (e) => {
        e.preventDefault()
        const orderClients = orderByFoundationAndRevenues($("#orderBy").find("#order-date").val(), $("#orderBy").find("#order-fat").val())
        if (isOrderActive) {
            $("#orderBy").empty()
            isOrderActive = false
        }
        $("#data").empty()
        if (!orderClients.length) {
            return $("#data").append('<p class="mr robot-font">Nenhum dado foi encontrado com esses parâmetros :(</p>')
        }
        orderClients.map(client => {
            $("#data").append(strData(client))
        })
    })
})

// Função dos 10 maiores faturamentos
const orderByTop10Revenues = () => {
    return clientes.sort((a, b) => b.faturamento - a.faturamento).slice(0, 10)
}

// Imprime na tela os 10 maiores faturamentos
$(document).ready(() => {
    $(".top").on('click', () => {
        const topClients = orderByTop10Revenues()
        $("#data").empty()
        topClients.map(client => {
            $("#data").append(strData(client))
        })
    })
})