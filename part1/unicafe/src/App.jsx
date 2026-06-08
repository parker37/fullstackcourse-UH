import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value, valType = 0 }) => {
  if (valType == 0) {
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  } else if (valType == 'percentage') {
    return(
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
}

const Statistics = ({stats: [ good, neutral, bad ]}) => {
  console.log(good, neutral, bad)
  const total = good + bad + neutral

  if (total == 0) return (<div>No feedback given</div>)

  else if (good == 0 && bad == 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='Good:' value={good}/>
            <StatisticLine text='Neutral:' value={neutral}/>
            <StatisticLine text='Bad:' value={bad}/>
            <StatisticLine text='Total:' value={total}/>
            <StatisticLine text='Average:' value={0}/>
            <StatisticLine text='Positive:' value={0} valType = 'percentage'/>
          </tbody>
        </table>
      </div>
    )
  }

  const average = (good - bad) / total
  const posPercentage = good / total

  return (
    <div>
      <table>
        <tbody>
            <StatisticLine text='Good:' value={good}/>
            <StatisticLine text='Neutral:' value={neutral}/>
            <StatisticLine text='Bad:' value={bad}/>
            <StatisticLine text='Total:' value={total}/>
            <StatisticLine text='Average:' value={average}/>
            <StatisticLine text='Positive:' value={posPercentage} valType = 'percentage'/>
        </tbody>
      </table>
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