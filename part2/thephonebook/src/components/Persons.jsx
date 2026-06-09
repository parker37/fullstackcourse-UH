const Persons = (props) => {
  const { shownPersons, deletePerson } = props

  return (
    <ul>
      {shownPersons.map((person) => 
        <li key={person.name}>
          {person.name} {person.number}

          <button onClick={() => {
            const verifyMsg = `Delete ${person.name}?`
            if (window.confirm(verifyMsg)) {
              return deletePerson(person.id)
            }
          }}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons