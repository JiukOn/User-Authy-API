import { Pool } from "pg";

const connectionString = 'postgres://ecdznpkf:BW67hoHI94kqEPAfQ-zyWwOaSDhcVwTr@kesavan.db.elephantsql.com/ecdznpkf';
const db = new Pool({connectionString});

export default db;