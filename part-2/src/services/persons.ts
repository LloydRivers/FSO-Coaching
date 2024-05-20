import axios from "axios";
// const baseUrl = "https://fso-coaching-part-3.onrender.com/api/persons";
const baseUrl = "http://localhost:3001/api/persons";

type Person = {
  name: string;
  number: string;
  _id: string;
};

type NewPerson = Omit<Person, "id">;

const getAll = async (): Promise<Person[]> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all persons:", error);
    throw error;
  }
};

const create = async (newObject: NewPerson) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.error("Error creating new person:", error);
    throw error;
  }
};

const update = async (id: string, newObject: NewPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error(`Error updating person with id ${id}:`, error);
    throw error;
  }
};

const deletePerson = async (id: string) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error(`Error deleting person with id ${id}:`, error);
    throw error;
  }
};

export { getAll, create, update, deletePerson };
