import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({stats: [ good, neutral, bad ]}) => {

  const total = good + bad + neutral

  if (total == 0) return (<div>No feedback given</div>)
  if (good == 0 && bad == 0) {
    return (
      <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: 0</p>
      <p>Positive: 0%</p>
    </div>
    )
  }

  const average = (good - bad) / total
  const posPercentage = good / total

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {posPercentage}%</p>
    </div>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>

      <h1>Statistics</h1>
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

export default App