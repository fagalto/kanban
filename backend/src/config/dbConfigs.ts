import { dbConfig } from "./configTypes"

 


const HU_PARTS: dbConfig = {
  user: "tracer1",
  password: "tracer1",
  server: 'ELMER',
  database: 'HU_PARTS',
  scheme: 'dbo',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },

  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: false,
    trustedConnection: false,
    
  },
};

const configKeyChain = {
  HU_PARTS:HU_PARTS
}

export default  configKeyChain ;