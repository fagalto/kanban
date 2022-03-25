export async function postData(url: string, data: any = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}
export async function getData(url: string) {

  const response = fetch(url, {
    headers: { 
      authorization: "asdasd asas",
    },
    method: "GET",
  });
  return response;
}
//put data to real rest api
export async function putData(url: string, data: any = {}) {
  const response = fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {

      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }); 
  return response 
}

export async function deleteData(url: string) {
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  });
  return response 
}

