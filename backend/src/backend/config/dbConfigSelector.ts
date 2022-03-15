import configKeyChain from "./dbConfigs"
import {  dbConfig } from "./configTypes"

const config = (dbName: string): dbConfig => {
  switch (dbName) {
    case "HU_PARTS":
      return configKeyChain.HU_PARTS
    default:
      return configKeyChain.HU_PARTS
  }
};

export default config;
