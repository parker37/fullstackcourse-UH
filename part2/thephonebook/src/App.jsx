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
    
    const personToAdd = persons.find(person => person.name === newName)
    console.log('Found Person:', personToAdd)

    if (personToAdd === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      return personsService.create(newPerson)
        .then(returnedPerson => {
          console.log('added', returnedPerson)

          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }

    const confirmMsg = `${newName} is already added to the phonebook, replace the old number with a new one?`

    if (window.confirm(confirmMsg)) {
      const updatedPerson = { ...personToAdd, number: newNumber}

      return personsService
        .update(personToAdd.id, updatedPerson)
        .then(returnedPerson => {
          console.log('updated', personToAdd, '\n to', returnedPerson);
          
          setPersons(persons.map(person => 
            person.id === personToAdd.id
            ? returnedPerson
            : person
          ))
          setNewName('')
          setNewNumber('')
        })
    }
    
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