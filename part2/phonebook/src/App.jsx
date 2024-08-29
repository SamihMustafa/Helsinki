import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name} {person.phoneNumber}</li>
}


const App = () => {
  const [persons, setPersons] = useState([
    { 
        name: 'Arto Hellas', 
        phoneNumber: '040-123456' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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
      phoneNumber: newNumber
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}  onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber}  onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App