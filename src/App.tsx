import { useState } from 'react'
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


// TODO: make it DRYer...if needed
// render selection top, mid, bottom
// render countdown and show whether top, mid, bot is correct
function App() {
  const [current, setCurrent] = useState<number>(0);
  const [targeted, setTargeted] = useState<number[]>([])
  const correctOrder = [...targeted].sort((a, b) => a-b); 
  // sort mutates existing array, hence clone

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
            setTargeted(n);
          }}>
            { targeted.map(i => (
                <div>
                  {members[i]}
                </div>
              )
            )}
          </button>
          <div>
          {
            `Correct order:`
          }
          </div>
          { 
            correctOrder.map(c => (
              <div>
                {members[c]}
              </div>
            ))
          }
        </p>
      </header>
    </div>
  )
}

export default App
