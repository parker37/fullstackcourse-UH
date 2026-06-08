import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value, valType = 0 }) => {
  if (valType == 0) return (<div>{text} {value}</div>)
  else if (valType == 'percentage') {
    return (<div>{text} {value}%</div>)
  }
}

const Statistics = ({stats: [ good, neutral, bad ]}) => {

  const total = good + bad + neutral

  if (total == 0) return (<div>No feedback given</div>)

  else if (good == 0 && bad == 0) {
    return (
      <div>
        <StatisticLine text='Good:' value={good}/>
        <StatisticLine text='Neutral:' value={neutral}/>
        <StatisticLine text='Bad:' value={bad}/>
        <StatisticLine text='Total:' value={total}/>
        <StatisticLine text='Average:' value={0}/>
        <StatisticLine text='Positive:' value={0} valType = 'percentage'/>
      </div>
    )
  }

  const average = (good - bad) / total
  const posPercentage = good / total

  return (
    <div>
      <StatisticLine text='Good:' value={good}/>
      <StatisticLine text='Neutral:' value={neutral}/>
      <StatisticLine text='Bad:' value={bad}/>
      <StatisticLine text='Total:' value={total}/>
      <StatisticLine text='Average:' value={average}/>
      <StatisticLine text='Positive:' value={posPercentage} valType='percentage'/>
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