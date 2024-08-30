import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  const setMessage = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const hook = () => {
    console.log('effect')
    personService.getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }
  
  useEffect(hook, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if(newName === '') {
      alert('Name cannot be blank')
      return
    }
    if(newNumber === '') {  
      alert('Number cannot be blank')
      return
    }

    const foundPerson = persons.find(person => person.name === newName)
    console.log(foundPerson)
    if(foundPerson) {

      const isConfirmed = window.confirm(`${newName} is already added to phonebook, replace old number with new one?`);

      if(isConfirmed) {
        const changedPerson = { ...foundPerson, number: newNumber }

        personService
          .updatePerson(foundPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${returnedPerson.name}`)
          })
        return
      }else {
        return
      }    
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }
    personService
    .create(nameObject)
    .then(returnedPerson => {
      console.log('added', returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${returnedPerson.name}`)
    })
  }

  const deletePerson = (selectedPerson) => {
    console.log('deleting person with id', selectedPerson.id)

    const isConfirmed = window.confirm(`Delete ${selectedPerson.name}?`);

    if(isConfirmed) {   
      personService
      .deletePerson(selectedPerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== selectedPerson.id))
        setMessage(`Deleted ${selectedPerson.name}`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} 
          newName={newName} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} 
          />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App