import { useState, useEffect } from 'react'

import personsService from "./services/persons"

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        console.log('received phonebook')
        setPersons(initialPersons)
      })
    
  }, [])

  console.log('render', persons.length, 'persons');
  

  const shownPersons = filter
    ? persons.filter((person) => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex(person => person.name == newName) >= 0) {
      return alert(`${newName} is already added to phonebook`)
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    personsService.create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)

        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    personsService.delete(id)
      .then(returnPerson => {
        console.log('removed', returnPerson);
        setPersons(persons.filter(p => p.id !== id))
      })
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App