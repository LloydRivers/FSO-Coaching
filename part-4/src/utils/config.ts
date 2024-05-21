import dotenv from "dotenv";
dotenv.config();

const PORT: string | undefined = process.env.PORT;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

export default { PORT, MONGODB_URI };
