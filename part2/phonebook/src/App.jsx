import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
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
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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