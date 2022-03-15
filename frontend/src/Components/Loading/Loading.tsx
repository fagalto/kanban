import * as React from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import ReactLoading from "react-loading";



///Indicate that there is some background work in app
const LoadingComponent = (props:ReduxType)=> {

const Loading = (
  <ReactLoading type="bubbles" color={"#1976d2"} height={10} width={100} />
);

     
  const load = props.isLoading ? Loading : null;

  return <div>{load}</div>;
};
export default connectToStore(LoadingComponent);
