import React, {useState} from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const gridSize = 3
    const x = currentIndex % gridSize
    const y = Math.floor(currentIndex / gridSize)
    console.log({x,y})
    return { x, y }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY()
    return `Coordinates (${x + 1}, ${y + 1})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setCurrentIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const gridSize = 3
    const x = currentIndex % gridSize
    const y = Math.floor(currentIndex / gridSize)

    switch (direction) {
      case 'left':
        return x > 0 ? currentIndex - 1 : currentIndex
      case 'up':
        return y > 0 ? currentIndex - gridSize : currentIndex
      case 'right': 
        return x < gridSize - 1 ? currentIndex + 1 : currentIndex
      case 'down':
        return y < gridSize - 1 ? currentIndex + gridSize : currentIndex
      default:
          return currentIndex 
    }
    

  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const nextIndex = getNextIndex(direction)
    if (nextIndex !== currentIndex) {
      setSteps(steps + 1)
    setCurrentIndex(nextIndex)
    } else {
      setMessage(`You can't go ${direction}`)
    }
    
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

   async function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    try {
      const {x, y} = getXY()
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x: x + 1,
          y: y + 1,
          steps,
          email,
        }),
      })
      const data = await response.json()
      setMessage(data.message || '')
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error submitting form')
    }
    setEmail(initialEmail)
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} time{steps === 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
              {idx === currentIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
