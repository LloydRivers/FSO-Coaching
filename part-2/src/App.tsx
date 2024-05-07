import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { getAll, create, update, deletePerson } from "./services/persons";

type Person = {
  name: string;
  number: string;
  id: number;
};

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [filter, setFilter] = useState("");

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

  const deletePersonById = async (id: number) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (!personToDelete) {
      return;
    }

    if (!window.confirm(`Delete ${personToDelete.name}?`)) {
      return;
    }

    try {
      await deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
      setFilteredPersons(filteredPersons.filter((person) => person.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePerson = async (id: number, newPerson: Person) => {
    try {
      const data = await update(id, newPerson);
      setPersons(persons.map((person) => (person.id !== id ? person : data)));
      setFilteredPersons(
        filteredPersons.map((person) => (person.id !== id ? person : data))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addPerson: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    try {
      const data = await create(personObject);
      setPersons(persons.concat(data));
      setFilteredPersons(persons.concat(data));
      setNewPerson({ name: "", number: "" });
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll();
      setPersons(data);
      setFilteredPersons(data);
    };

    fetchData();
  }, []);

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
      <Persons
        filteredPersons={filteredPersons}
        deletePersonById={deletePersonById}
      />
    </div>
  );
};

export default App;
