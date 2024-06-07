import dotenv from "dotenv";
dotenv.config();

const PORT: string | undefined = process.env.PORT;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
const SECRET: string | undefined = process.env.SECRET;

export default { PORT, MONGODB_URI, SECRET };
