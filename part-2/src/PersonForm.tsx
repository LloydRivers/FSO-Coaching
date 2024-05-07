import React from "react";

type PersonFormProps = {
  addPerson: (event: React.FormEvent<HTMLFormElement>) => void;
  handleName: React.ChangeEventHandler<HTMLInputElement>;
  handleNumber: React.ChangeEventHandler<HTMLInputElement>;
  newPerson: { name: string; number: string };
};

const PersonForm = ({
  addPerson,
  handleName,
  handleNumber,
  newPerson,
}: PersonFormProps) => {
  return (
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
  );
};

export default PersonForm;
