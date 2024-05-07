import { useState } from "react";

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
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson.name} onChange={handleName} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
