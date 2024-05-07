type Person = {
  name: string;
  number: string;
  id: number;
};

type PersonsProps = {
  filteredPersons: Person[];
  deletePersonById: (id: number) => void;
};

const Persons = ({ filteredPersons, deletePersonById }: PersonsProps) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePersonById(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
