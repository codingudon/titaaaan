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
  const [current, setCurrent] = useState<number>(0);
  const [indexes, setIndexes] = useState<number[]>([])

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
          {
            members.map((name, index) => (
              <div onClick={() => setCurrent(index)}>
                {name}
              </div>
            ))
          }
        </div>
        {
          `Current: ${members[current]}`
        }
        <p>
          <button type="button" onClick={() => {
            const n = genThreeRandomNumbers(NUMBER_OF_MEMBERS);
            setIndexes(n);
          }}>
            { indexes.map(i => (
                <div>
                  {members[i]}
                </div>
              )
            )}
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
