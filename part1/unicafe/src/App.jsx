import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  if(props.total === 0) {
    return(<p>No feedback given</p>)
  }

  return(<>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p> 
      <p>bad {props.bad}</p>
      <p>total {props.total}</p>
      <p>average {props.average}</p>
      <p>postive {props.postiveFeedback}%</p>
  </>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const postiveFeedback = good / total * 100
  const average = (good - bad) / total
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} postiveFeedback={postiveFeedback} />
    </div>
  )
}

export default App