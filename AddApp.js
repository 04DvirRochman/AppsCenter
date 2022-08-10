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
    let submit = document.querySelector('#submit');
    submit.addEventListener('click',event=>submitForm(event));
    
}

function submitForm(event) {
    event.preventDefault();
    let tForm = document.querySelector('#tForm')
    let app = getAppFromForm();

    if(validateApp(app)){
        addApp(app);
    }
    else{
        tForm.classList.remove('was-validated');
    }
    

  }

  function addApp(app){
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

  function validateApp(app){
    let invalid = new RegExp("/[^\w]/");

    if(invalid.test(app.name)){
        console.log("hi");
        return false;
    }
    if(app.name.length < 4 || app.name.length > 30){
        return false;
    }
    if(app.price < 0){
        return false;
    }
    if(app.desc.length >500)
    {
        return false;
    }
    if(app.companyName.length >30){
        return false;
    }
    return true;
  }