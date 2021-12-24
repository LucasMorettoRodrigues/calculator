let operandon1 = ''
let operandon2 = ''
let numeroAtual = ''
let operadorAtual = null
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

function operar(operador, a, b){
    a = Number(a)
    b = Number(b)
    switch (operador) {
        case '+':
            return somar(a, b)
        case '-':
            return subtrair(a,b)
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
    operandon1 = numeroAtual
    numeroAtual = ''
    ponto.disabled = false
    operadorAtual = operador
    memoria.textContent += ` ${operador} `
}

function getResultado() {
    operandon2 = numeroAtual
    numeroAtual = ''
    let resultado = operar(operadorAtual, operandon1, operandon2)
    display.textContent = resultado
    sujo = 1
}

function reset() {
    if (sujo === 1) {
        memoria.textContent = ''
        sujo = 0
    }
}

function clear() {
    operandon1 = '' 
    operandon2 = ''
    numeroAtual = ''    
    memoria.textContent = ''
    display.textContent = ''
}



