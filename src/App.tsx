import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const members = [
  'ryuusei',
  'peach',
  'snaps',
  'udon',
  'ellie',
  'jin',
  'anny',
  'rin'
];

const NUMBER_OF_MEMBERS = members.length;

const genThreeRandomNumbers = (max: number, numbers = new Set<number>()): number[] => {
  if (numbers.size === 3) {
    return Array.from(numbers);
  }

  const random = Math.floor(Math.random() * max)
  if (numbers.has(random)) {
    return genThreeRandomNumbers(max, numbers);
  }

  return genThreeRandomNumbers(max, numbers.add(random));
}

function App() {
  const [numbers, setNumbers] = useState<number[]>([])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => {
            const n = genThreeRandomNumbers(NUMBER_OF_MEMBERS);
            setNumbers(n);
          }}>
            { numbers.map(n => {
              return (
                <div>
                  {members[n]}
                </div>
              );
            })}
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
