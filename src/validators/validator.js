//========================= Validators =========================


const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}


const isValid = function(value) {
    
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true
 }

 const isValid2 = function(value) {
    const dv = /[a-zA-Z]/; 
    if(typeof value !== 'string') return false
    if(dv.test(value)=== false) return false
    return true
 }

 const isValidTitle = function(title) {
     //console.log(['Mr','Mrs','Miss'].includes(title));
     return ['Mr','Mrs','Miss'].includes(title)
 }


 const isValidEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email) 
  
}

const isValidPhone = function(mobileNumber) {
    return /^([+]\d{2}[ ])?\d{10}$/.test(mobileNumber) 
    //return /^[6789]\d{9}$/.test(mobileNumber)
 }

 const isValidPassword = function(pass){
     let passRE = /^(?!\S*\s)(?=\D*\d)(?=.*[!@#$%^&*])(?=[^A-Z]*[A-Z]).{8,15}$/;
     return passRE.test(pass)
 }



 module.exports.isValid = isValid
 module.exports.isValid2 = isValid2
 module.exports.isValidRequestBody = isValidRequestBody
 module.exports.isValidTitle = isValidTitle
 module.exports.isValidEmail = isValidEmail
 module.exports.isValidPhone = isValidPhone
 module.exports.isValidPassword = isValidPassword