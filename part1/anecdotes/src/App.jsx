import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0))
  const [currentMax, setCurrentMax] = useState(0)
  console.log('selected',selected)

  const handleVotes = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    if (copy[selected] > copy[currentMax]) {
      setCurrentMax(selected)
    }
    setAllVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {allVotes[selected]} votes</div>
      <div>
        <Button text="vote" handleClick={handleVotes.bind(this)} />
        <Button text="next anecdote"handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[currentMax]}
      <div>has {allVotes[currentMax]} votes</div>
    </div>
  )
}

export default App