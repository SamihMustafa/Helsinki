const Person = ({ person, deletePerson }) => {
    return <li>{person.name} {person.number} <button onClick={deletePerson}>delete</button></li>
  }
  


const Persons = ({ personsToShow, deletePerson }) => {

    return (
        <ul>
        {personsToShow.map(person => 
            <Person key={person.name} person={person} deletePerson={() => deletePerson(person)} />
          )}
        </ul>
    )
}

export default Persons