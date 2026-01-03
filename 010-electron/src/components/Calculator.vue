<template>
  <div class="calculator">
    <div class="display">
      <div class="previous-operand">{{ previousOperand }} {{ operation }}</div>
      <div class="current-operand">{{ currentOperand || '0' }}</div>
    </div>

    <div class="buttons">
      <button @click="clear" class="btn operator">AC</button>
      <button @click="deleteDigit" class="btn operator">DEL</button>
      <button @click="percent" class="btn operator">%</button>
      <button @click="setOperation('/')" class="btn operator">÷</button>

      <button @click="appendDigit('7')" class="btn">7</button>
      <button @click="appendDigit('8')" class="btn">8</button>
      <button @click="appendDigit('9')" class="btn">9</button>
      <button @click="setOperation('*')" class="btn operator">×</button>

      <button @click="appendDigit('4')" class="btn">4</button>
      <button @click="appendDigit('5')" class="btn">5</button>
      <button @click="appendDigit('6')" class="btn">6</button>
      <button @click="setOperation('-')" class="btn operator">−</button>

      <button @click="appendDigit('1')" class="btn">1</button>
      <button @click="appendDigit('2')" class="btn">2</button>
      <button @click="appendDigit('3')" class="btn">3</button>
      <button @click="setOperation('+')" class="btn operator">+</button>

      <button @click="appendDigit('0')" class="btn zero">0</button>
      <button @click="appendDigit('.')" class="btn">.</button>
      <button @click="calculate" class="btn operator equals">=</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface CalculatorState {
  currentOperand: string
  previousOperand: string
  operation: string | null
  overwrite: boolean
}

const state = ref<CalculatorState>({
  currentOperand: '',
  previousOperand: '',
  operation: null,
  overwrite: false
})

const currentOperand = computed(() => state.value.currentOperand)
const previousOperand = computed(() => state.value.previousOperand)
const operation = computed(() => state.value.operation)

const appendDigit = (digit: string) => {
  if (state.value.overwrite) {
    state.value.currentOperand = digit
    state.value.overwrite = false
    return
  }

  if (digit === '.' && state.value.currentOperand.includes('.')) return
  if (digit === '0' && state.value.currentOperand === '0') return

  state.value.currentOperand = state.value.currentOperand === '0' && digit !== '.'
    ? digit
    : state.value.currentOperand + digit
}

const setOperation = (op: string) => {
  if (state.value.currentOperand === '' && op !== '-') return

  if (state.value.previousOperand !== '' && state.value.operation && !state.value.overwrite) {
    calculate()
  }

  if (op === '-' && state.value.currentOperand === '') {
    state.value.currentOperand = '-'
    return
  }

  if (state.value.currentOperand === '') return

  state.value.previousOperand = state.value.currentOperand
  state.value.currentOperand = ''
  state.value.operation = op
}

const calculate = () => {
  if (!state.value.operation || state.value.previousOperand === '' || state.value.currentOperand === '') {
    return
  }

  const prev = parseFloat(state.value.previousOperand)
  const current = parseFloat(state.value.currentOperand)

  if (isNaN(prev) || isNaN(current)) return

  let computation = 0
  switch (state.value.operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '/':
      if (current === 0) {
        alert('Ошибка: деление на ноль!')
        clear()
        return
      }
      computation = prev / current
      break
    default:
      return
  }

  computation = Math.round(computation * 100000000) / 100000000

  state.value.currentOperand = computation.toString()
  state.value.previousOperand = ''
  state.value.operation = null
  state.value.overwrite = true
}

const clear = () => {
  state.value.currentOperand = ''
  state.value.previousOperand = ''
  state.value.operation = null
  state.value.overwrite = false
}

const deleteDigit = () => {
  if (state.value.overwrite) {
    clear()
    return
  }

  state.value.currentOperand = state.value.currentOperand.slice(0, -1)
}

const percent = () => {
  const current = parseFloat(state.value.currentOperand)
  if (isNaN(current)) return

  state.value.currentOperand = (current / 100).toString()
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key >= '0' && e.key <= '9') appendDigit(e.key)
  else if (e.key === '.') appendDigit('.')
  else if (e.key === '+') setOperation('+')
  else if (e.key === '-') setOperation('-')
  else if (e.key === '*') setOperation('*')
  else if (e.key === '/') {
    e.preventDefault()
    setOperation('/')
  }
  else if (e.key === 'Enter' || e.key === '=') calculate()
  else if (e.key === 'Escape') clear()
  else if (e.key === 'Backspace') deleteDigit()
  else if (e.key === '%') percent()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  padding: 20px;
  background: #2c3e50;
  height: 100vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.display {
  background: #1a252f;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: right;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.previous-operand {
  color: #95a5a6;
  font-size: 1.2rem;
  min-height: 1.5rem;
}

.current-operand {
  color: #ecf0f1;
  font-size: 2.5rem;
  font-weight: bold;
  word-break: break-all;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #34495e;
  color: #ecf0f1;
  transition: all 0.2s;
}

.btn:hover {
  background: #3d566e;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.operator {
  background: #3498db;
  color: white;
}

.operator:hover {
  background: #2980b9;
}

.equals {
  background: #2ecc71;
  grid-column: span 1;
}

.equals:hover {
  background: #27ae60;
}

.zero {
  grid-column: span 2;
}

@media (max-width: 480px) {
  .calculator {
    max-width: 100%;
    padding: 15px;
  }

  .btn {
    padding: 15px;
    font-size: 1.3rem;
  }
}
</style>