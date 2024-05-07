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
  const [render, setRender] = useState(false);

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

  const addPerson: React.FormEventHandler<HTMLFormElement> = async (event) => {
    // First we prevent the default form submission behavior
    event.preventDefault();

    // Then we check if the person already exists in the phonebook
    const exists = persons.find((person) => person.name === newPerson.name);

    // We create a new person object with the name and number from the form
    const person = {
      name: newPerson.name,
      number: newPerson.number,
    };

    // If the person already exists, we ask the user if they want to update the number
    if (exists) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        try {
          // If the user confirms, we update the person's number
          await update(exists.id, person);
          setNewPerson({ name: "", number: "" });
          // We set the render state to true to trigger a re-render
          setRender(!render);
          return;
        } catch (error) {}
      } else {
        // If the user cancels, we return early and clear the form
        setNewPerson({ name: "", number: "" });
        return;
      }
    } else {
      try {
        // If we get here it means the person doesn't exist in the phonebook and the code is self explanatory
        const data = await create(person);
        setPersons(persons.concat(data));
        setFilteredPersons(persons.concat(data));
        setNewPerson({ name: "", number: "" });
      } catch (error) {
        console.log(error);
      }
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
  const fetchData = async () => {
    const data = await getAll();
    setPersons(data);
    setFilteredPersons(data);
  };
  useEffect(() => {
    fetchData();
  }, [render]);

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
