

//import {getAllApps,removeApp, addApp} from "../services/appsServices.js";
//import {validateName} from "./validations.js";

let allApps;

window.onload = () => {
    //localStorage.clear();
    //getData();
    start();
    //document.querySelector('#addApp').addEventListener('click',event=>changePage(event));
}

async function start()
{
    allApps = await getAllApps();
    await refreshApps();
}

async function refreshApps() {
    document.querySelector('#appsContainer').innerHTML = '';
    let appsHTML = "";
    let allApps = await getAllApps();
    allApps.map((app) => appsHTML += generateAppHTML(app));

    let appsContainer = document.querySelector('#appsContainer');
    appsContainer.innerHTML = appsHTML;
}

function generateAppHTML(app) {
    if (app.description === '') {
        app.description = "this app does not have a description";
    }
    if (app.companyname === '') {
        app.companyname = "this app does not have company";
    }
    if(app.imageurl === '')
    {
        app.imageurl = '../images/Help.png';
    }
    else
    {
        app.imageurl = `../images/${app.imageurl}`;
    }


    return `
    <div class="card" >
                <div class="row">
                    <div class = "col-3">
                        <img style=" border: none; width: 150px; height: 150px" class="img-thumbnail rounded-circle" src="${app.imageurl}" alt="" onerror="this.src='../images/Help.png'">
                    </div>
                    <div  class = "col-6">
                        <h3>${app.name}</h3>
                        <p>${app.description}</p>
                        <p>${app.companyname}</p>
                        <p><b>${app.price}$</b></p>
                    </div>
                    <div class = "col-3 d-flex justify-content-center align-items-center">
                        <div>
                            <button onclick="onClickEdit(${app.id})" data-toggle="modal" data-target="#addAppModal" type="button" class="mr-3  btn btn-secondary rounded-circle ">✏</button>
                        </div>
                        <div>
                            <button onclick="onClickRemove(${app.id})" type="button" class="  btn btn-danger rounded-circle ">🗑</button>
                        </div>
                        
                    </div>
                </div>
            </div>
    `;
}

window.onClickRemove = async (id)=>{
    removeApp(id).then(()=>{
        let audio = new Audio('../sound.mp3');
    audio.play();
    refreshApps();
    });
}

window.searchApp = async ()=> {
    let appsContainer = document.querySelector('#appsContainer');
    appsContainer.innerHTML = null;
    let searchBar = document.querySelector('#searchBar');
    let filter = searchBar.value.toUpperCase();
    //let filteredApps = await getAllApps();
    filteredApps = allApps.filter(app => app.name.toUpperCase().indexOf(filter) > -1);
    let appsHTML = "";
    filteredApps.map(app => appsHTML += generateAppHTML(app));

    appsContainer.innerHTML = appsHTML;
}

window.submitFormAddApp = async (event)=> {
    event.preventDefault();
    let forms = [...document.querySelectorAll('.form-control')];
    let app = getAppFromForm();

    if (!forms.every(form => !form.classList.contains('is-invalid'))) {
        event.stopPropagation();
        return;
    }

    await addApp(app);
    let audio = new Audio('../sound.mp3');
    audio.play();
    refreshApps();
    $('#addAppModal').modal('hide');
}

window.submitFormEditApp = async (event,id)=> {
    event.preventDefault();
    let forms = [...document.querySelectorAll('.form-control')];
    let app = getAppFromForm();
    app['id'] = id;

    if (!forms.every(form => !form.classList.contains('is-invalid'))) {
        event.stopPropagation();
        return;
    }

    await editApp(app);
    let audio = new Audio('../sound.mp3');
    audio.play();
    refreshApps();
    $('#addAppModal').modal('hide');
}

window.onClickEdit = async (id)=>{
    changeModalHeader("Edit Application");
    let app = await getApp(id);
    document.querySelector('#imgInput').value = app.imageurl;
    document.querySelector('#nameInput').value = app.name;
    document.querySelector('#priceInput').value = app.price;
    document.querySelector('#descInput').value = app.description;
    document.querySelector('#companyInput').value = app.companyname;
    validateName(document.querySelector('#nameInput'));
    const submitButton = document.querySelector('#submit');
    submitButton.textContent = 'Edit Application';
    submitButton.setAttribute('onclick',`submitFormEditApp(event,${app.id})`);
}

window.onClickAddApp = async ()=>{
    changeModalHeader("Add Application");
    document.querySelector('#imgInput').value = '';
    document.querySelector('#nameInput').value = '';
    document.querySelector('#priceInput').value = '';
    document.querySelector('#descInput').value = '';
    document.querySelector('#companyInput').value = '';
    validateName(document.querySelector('#nameInput'));
    const submitButton = document.querySelector('#submit');
    submitButton.textContent = 'Publish Application';
    submitButton.setAttribute('onclick',`submitFormAddApp(event)`);
}

function changeModalHeader(newHeader){
    const modal = document.querySelector('#addAppModal');
    modal.querySelector('.modal-header').textContent = newHeader;
}


function getAppFromForm(){
    let newApp = {
    'imageUrl': document.querySelector('#imgInput').value,
    'name' : document.querySelector('#nameInput').value,
    'price' : document.querySelector('#priceInput').value,
    'desc' : document.querySelector('#descInput').value,
    'companyName' : document.querySelector('#companyInput').value
    }
    return newApp;
  }

window.nameFieldOnInputChange = (event)=>{
    validateName(event.target);
}