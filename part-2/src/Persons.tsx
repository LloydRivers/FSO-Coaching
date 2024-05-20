type Person = {
  name: string;
  number: string;
  _id: string;
};

type PersonsProps = {
  filteredPersons: Person[];
  deletePersonById: (id: string) => void;
};

const Persons = ({ filteredPersons, deletePersonById }: PersonsProps) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person._id}>
          {person.name} {person.number}
          <button onClick={() => deletePersonById(person._id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
