type httpStatus = {
    code: number,
    name: string,
    description?: string
    
}
const httpStatusTable: httpStatus[] = []


//200 - ok

httpStatusTable.push({ code: 200, name: 'OK' })
httpStatusTable.push({ code: 201, name: "CREATED" });
httpStatusTable.push({ code: 202, name: "ACCEPTED" });

//errors

httpStatusTable.push({ code: 400, name: "BAD REQUEST" });
httpStatusTable.push({ code: 401, name: "UNAUTHORIZED" });
httpStatusTable.push({ code: 403, name: "FORBIDDEN" });
httpStatusTable.push({ code: 404, name: "NOT FOUND" });
httpStatusTable.push({ code: 405, name: "METHOD NOT ALLOWED" });


function getStatus(code: number): httpStatus  {
    const noStatus: httpStatus = {
        code: 499,
        name:"NO STATUS"
    }
    const status = httpStatusTable.find(status => status.code == code)
    
    return status != undefined ? status : noStatus;
    
}

export default getStatus
export {httpStatus}
