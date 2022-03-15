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
    method: "GET", 
  });
  return response;
}
export async function putData(url: string, data: any = {}) {
  const getUrl = new URL(url);
  console.log(getUrl.href);
  getUrl.search = new URLSearchParams(data).toString();
  console.log(getUrl.href);
  // console.log("putting:",getUrl.href)
  const response = fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
 mode:"no-cors",
        headers: {
          'Content-Type': 'application/json'
          
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    
  });
  console.log("response:", response)
  return response
}
//put data to real rest api
export async function putData2(url: string, data: any = {}) {
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

export async function deleteData(url: string, data: any = {}) {
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  });
  return response 
}
