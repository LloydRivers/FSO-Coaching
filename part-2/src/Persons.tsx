type Person = {
  name: string;
  number: string;
  id: number;
};

type PersonsProps = {
  filteredPersons: Person[];
};

const Persons = ({ filteredPersons }: PersonsProps) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
