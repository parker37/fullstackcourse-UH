const Header = (props) => {
  console.log(props)

  return (
    <div>
      <h2>{props.course}</h2>
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
      <h4>Total of {total} exercises</h4>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course