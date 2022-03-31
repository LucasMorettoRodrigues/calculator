let operandosList = []
let numeroAtual = ''
let operadoresList = []
let sujo = null

const numbers = document.querySelectorAll('#number')
const ponto = document.querySelector('.ponto')
const operadores = document.querySelectorAll('#operador')
const igual = document.querySelector('#igual')
const display = document.querySelector('#display')
const memoria = document.querySelector('#memoria')
const limpar = document.querySelector('#clear')

numbers.forEach(number =>
    number.addEventListener('click', () => pressNumber(number.value)))

operadores.forEach(operador =>
    operador.addEventListener('click', () => setOperador(operador.value)))

igual.addEventListener('click', getResultado)
limpar.addEventListener('click', clear)

function pressNumber(number) {
    reset()
    numeroAtual += number
    memoria.textContent += number
    if (numeroAtual.includes('.')) ponto.disabled = true
}

function somar(a, b) {
    return a + b
}

function subtrair(a, b) {
    return a - b
}

function multiplicar(a, b) {
    return a * b
}

function dividir(a, b) {
    return a / b
}

function calcular(operadoresList, operandosList) {
    if (operadoresList.length !== operandosList.length - 1) return 'Math ERROR'
    console.log(operadoresList, operandosList);

    for (let i = 0; i < operadoresList.length; i++) {
        if (operadoresList[i] === '*' || operadoresList[i] === '/') {
            let resultado = operar(operadoresList[i], operandosList[i], operandosList[i + 1])
            operandosList[i] = resultado
            operandosList.splice(i + 1, 1)
            operadoresList.splice(i, 1)
            calcular(operadoresList, operandosList)
        }
    }

    for (let i = 0; i <= operadoresList.length; i++) {
        if (operadoresList[i] === '+' || operadoresList[i] === '-') {
            let resultado = operar(operadoresList[i], operandosList[i], operandosList[i + 1])
            operandosList[i] = resultado
            operandosList.splice(i + 1, 1)
            operadoresList.splice(i, 1)
            calcular(operadoresList, operandosList)
        }
    }

    return operandosList[0]
}

function operar(operador, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operador) {
        case '+':
            return somar(a, b)
        case '-':
            return subtrair(a, b)
        case '*':
            return multiplicar(a, b)
        case '/':
            if (b === 0) return 'Math ERROR'
            return dividir(a, b)
        default:
            return 'Math ERROR'
    }
}

function setOperador(operador) {
    if (numeroAtual === '') {
        reset()
        numeroAtual = display.textContent
        memoria.textContent += 'Ans'
    }
    operandosList.push(numeroAtual)
    numeroAtual = ''
    ponto.disabled = false
    operadoresList.push(operador)
    memoria.textContent += ` ${operador} `
}

function getResultado() {
    operandosList.push(numeroAtual)
    numeroAtual = ''
    let resultado = calcular(operadoresList, operandosList)
    display.textContent = resultado
    sujo = 1
    operandosList = []
}

function reset() {
    if (sujo === 1) {
        memoria.textContent = ''
        sujo = 0
    }
}

function clear() {
    operadoresList = []
    operandosList = []
    numeroAtual = ''
    memoria.textContent = ''
    display.textContent = ''
}



