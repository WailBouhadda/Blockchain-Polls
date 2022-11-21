const requests = async (url = '', optionsObj = null, errMsg = null) => {

    try{
        const response = await fetch(url, optionsObj);
        if(!response.ok) throw Error('Please reload the app !');
    }catch(err){
        errMsg = err.message;
    }finally{
        return errMsg;
    }
}

const getPolls = () => {

    return
}


export default requests;