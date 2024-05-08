import React from "react";

type FilterProps = {
  filter: string;
  handleFilter: React.ChangeEventHandler<HTMLInputElement>;
};

const Filter = ({ filter, handleFilter }: FilterProps) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
