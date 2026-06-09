import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('received phonebook')
        setPersons(response.data)
      })
    
  }, [])

  console.log('render', persons.length, 'persons');
  

  const shownPersons = filter? persons.filter(
        (person) => person.name.toLowerCase().includes(filter)
    ) : persons

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex(person => person.name == newName) >= 0) {
      return alert(`${newName} is already added to phonebook`)
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    axios.post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response.data)
      })

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        filterHandler={handleFilterChange}
        filter={filter}
      />

      <h3>Add New Number</h3>

      <PersonForm 
        onSubmit={addPerson}
        nameHandler={handleNameChange}
        nameState={newName}
        numberHandler={handleNumberChange}
        numberState={newNumber}
      />

      <h3>Numbers</h3>

      <Persons
        shownPersons={shownPersons}
      />

      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App