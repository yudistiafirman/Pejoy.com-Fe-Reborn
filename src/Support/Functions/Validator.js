

export function EmailValidator(email){
    const re = /\S+@\S+\.\S+/;
    if(email.match(re)){
        return true
    }else{
        return false
    }
}