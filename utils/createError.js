

export const createError = (status, message)=>{
    const newErr = new Error();
    newErr.status = status;
    newErr.message = message;
    return newErr
}

