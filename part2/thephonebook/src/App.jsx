import { useState, useEffect } from 'react'

import personsService from "./services/persons"

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const shownPersons = filter
    ? persons.filter((person) => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons

  console.log('render', persons.length, 'persons');


  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        console.log('received phonebook')
        setPersons(initialPersons)
      })
      .catch(() => {
        setErrorMsg("Couldn't get phonebook from server")
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000);
      })
  }, [])  

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

          setSuccessMsg(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMsg(null)
          }, 5000);
        })
        .catch(() => {
          setErrorMsg(`Couldn't add '${newPerson.name}' to server`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000);
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

          setSuccessMsg(`Updated ${updatedPerson.name}'s Number to ${updatedPerson.number}`)
          setTimeout(() => {
            setSuccessMsg(null)
          }, 5000);
        })
        .catch(() => {
          setErrorMsg(`Information of '${personToAdd.name}' is no longer in server`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000);

          setPersons(persons.filter(p => p.name !== personToAdd.name))
        })
    }
    
  }

  const deletePerson = (id) => {
    personsService.delete(id)
      .then(returnedPerson => {
        console.log('removed', returnedPerson);
        setPersons(persons.filter(p => p.id !== id))

        setSuccessMsg(`Deleted  ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000);
      })
      .catch((error) => {
        console.log('error:', error);
        
        const queriedPersonName = persons.find(p => p.id === id).name

        setErrorMsg(`'${queriedPersonName}' has already been removed from the server`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000);

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

      <Notification message={successMsg} type={'success'}/>
      <Notification message={errorMsg} type={'error'}/>

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