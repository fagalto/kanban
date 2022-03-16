type dbConfig = {
  user: string;
  password: string;
  server: string;
  database: string;
  scheme: string;
  pool?: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
  options?: {
    encrypt?: boolean; // for azure
    enableArithAbort?: boolean;
    trustServerCertificate?: boolean; // change to true for local dev / self-signed certs
    trustedConnection?: boolean;
  };
};

export { dbConfig };
