function validateLength(element,minLength,maxLength){
    if(element.value.length > maxLength || element.value.length < minLength){
        return false;
    }
    return true;
  }

  function validateLettersAndNumbers(element){
    let invalid = new RegExp("[^A-Z^a-z^0-9\\s]","g");
    if(invalid.test(element.value)){
        return false;
    }
    return true;
  }

  function validateName(element) {
    if (!validateLength(element, 4, 30) || !validateLettersAndNumbers(element)) {
        if (element.classList.contains('is-valid')) {
            element.classList.replace('is-valid', 'is-invalid');
        }
        else {
            element.classList.add('is-invalid');
        }
    }
    else {
        if (element.classList.contains('is-invalid')) {
            element.classList.replace('is-invalid', 'is-valid');
        }
        else {
            element.classList.add('is-valid');
        }
    }
}

//export {validateName};