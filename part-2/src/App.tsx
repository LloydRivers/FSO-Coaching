import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [filter, setFilter] = useState("");

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

  const addPerson: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewPerson({
      name: "",
      number: "",
    });
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value });
  };

  const handleNumber: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value });
  };

  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilter(event.target.value);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} handleFilter={handleFilter} />
      </div>
      <h3>Add a new person</h3>

      <PersonForm
        addPerson={addPerson}
        handleName={handleName}
        handleNumber={handleNumber}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
