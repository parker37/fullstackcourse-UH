const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)

  return (
    <div>
      {props.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  const { parts } = props
  console.log('Total Component, parts prop', parts)
  
  const total = parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
     0
  )
  console.log(total)

  return (
    <div>
      <h4>Total of {total} exercises </h4>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  } 
  

  return <Course course={course} />
}

export default App