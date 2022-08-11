const addItemToTheList = (data) => {
    localStorage.setItem('applications', JSON.stringify(JSON.parse(localStorage.getItem('applications')).concat(data)));
}

const getNextId = () => {
    let id = localStorage.getItem('id');
    localStorage.setItem('id', ++id);
    
    return id;
}

document.addEventListener("DOMContentLoaded", () => {
		
});

window.onload = () => {
    let form = document.querySelector('.needs-validation');
    form.addEventListener('submit',event=> submitForm(event));
}


function submitForm(event) {
    event.preventDefault();
    let forms = [...document.querySelectorAll('.form-control')];
    let app = getAppFromForm();

    if(!forms.every(form=>!form.classList.contains('is-invalid')))
    {
        event.stopPropagation();
        return;
    }

    app.id = getNextId();
    addItemToTheList(app);
    window.location.href='./mainPage.html';
  }

  function getAppFromForm(){
    let newApp = {
    'id' : 0,
    'imageUrl': document.querySelector('#imgInput').value,
    'name' : document.querySelector('#nameInput').value,
    'price' : document.querySelector('#priceInput').value,
    'desc' : document.querySelector('#descInput').value,
    'companyName' : document.querySelector('#companyInput').value
    }
    return newApp;
  }

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

  function validateName(){
    let inputField = document.querySelector('#nameInput');
    if(!validateLength(inputField,4,30) || !validateLettersAndNumbers(inputField)){
        console.log("hi");
        if(inputField.classList.contains('is-valid')){
            inputField.classList.replace('is-valid', 'is-invalid');
        }
        else{
            inputField.classList.add('is-invalid');
        }
    }
    else{
        if(inputField.classList.contains('is-invalid')){
            inputField.classList.replace('is-invalid', 'is-valid');
        }
        else{
            inputField.classList.add('is-valid');
        }
    }
  }
