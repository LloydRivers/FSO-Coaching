import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import { getAll, create, update, deletePerson } from "./services/persons";
import "./style.css";

type Person = {
  name: string;
  number: string;
  id: number;
};

const App = () => {
  // Array of persons
  const [persons, setPersons] = useState<Person[]>([]);
  // Array of persons that match the filter
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [filter, setFilter] = useState("");
  // State to trigger a re-render
  const [render, setRender] = useState(false);
  // State controlling the form input fields
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  // State to hold the newly added persons name for the notification
  const [addedPerson, setAddedPerson] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

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
      setRender(!render);
    } catch (error) {
      setError(true);
      setErrorMessage(`Person ${personToDelete.name} was already deleted`);
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
          // We set the render state to true to trigger a re-render
          setRender(!render);
          // We clear the form
          setNewPerson({ name: "", number: "" });
          return;
        } catch (error) {
          setErrorMessage(`Person ${newPerson.name} was already deleted`);
          console.log(error);
        }
      } else {
        // If the user cancels, we return early and clear the form
        setNewPerson({ name: "", number: "" });
        return;
      }
    } else {
      try {
        // If we get here it means the person doesn't exist in the phonebook and the code is self explanatory
        await create(person);
        setNewPerson({ name: "", number: "" });
        setAddedPerson(newPerson.name);
        setIsAdded(true);
        setRender(!render);

        setTimeout(() => {
          setIsAdded(false);
        }, 5000);
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
    try {
      const data = await getAll();
      setPersons(data);
      setFilteredPersons(data);
    } catch (error) {
      console.log("Error fetching data");
      setError(true);
      setErrorMessage("Error fetching data");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [render]);

  return (
    <div>
      <h2>Phonebook</h2>
      {error && <Notification message={errorMessage} />}
      {isAdded && (
        <p className="added-person">Added {addedPerson} to the phonebook</p>
      )}
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
