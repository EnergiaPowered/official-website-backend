let errorResponce = (errorType,module)=>{
    if (errorType === 500){
        if (module === "send_emails"){
            return {
                message:(`Internal server error in ${module} module`)
            }
        } 
        else{
            return {
                    message:(`Error occured while getting the db in ${module} module`)
                }
        }
    }
    else if (errorType === 404){ 
        if (module === "user"){
            return {
                message:(`can't find user in ${module} module`)
                
            } 
        }
        else{
        return {
            message:(`Not found in ${module} module`)
            
        }
    }
    }



}

let successResponce = (module)=>{
    if (module === "crew"){
    return {
        message:(`Deleted member in ${module}module`)
        
    }
}
    else if (module === "form" || module === "formResponce" ){
    return {
        message:(`ok in ${module} module`)
        
    }
}

    else if (module === "send_emails" ){
    return {
        message:(`Emails are sent successfully! in ${module} module`)
        
    }
}

}

