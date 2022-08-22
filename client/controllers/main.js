
import {getAllApps,getData,removeApp,getNextId, addApp} from "../services/appsServices.js";
import {validateName} from "./validations.js";


window.onload = () => {
    //localStorage.clear();
    //getData();
    start();
    //document.querySelector('#addApp').addEventListener('click',event=>changePage(event));
}

async function start()
{
    let l = await getAllApps();
    await refreshApps();
}

async function refreshApps() {
    document.querySelector('#appsContainer').innerHTML = '';
    let appsHTML = "";
    let apps = await getAllApps();
    apps = apps.map((app) => appsHTML += generateAppHTML(app));

    let appsContainer = document.querySelector('#appsContainer');
    appsContainer.innerHTML = appsHTML;
}

function generateAppHTML(app) {
    if (app.desc === '') {
        app.desc = "this app does not have a description";
    }
    if (app.companyName === '') {
        app.companyName = "this app does not have company";
    }
    if(app.imageUrl === '')
    {
        app.imageUrl = '../images/Help.png';
    }
    else
    {
        app.imageUrl = `../images/${app.id}/${app.imageUrl}`;
    }


    return `
    <div class="card" >
                <div class="row">
                    <div class = "col-3">
                        <img style=" border: none; width: 150px; height: 150px" class="img-thumbnail rounded-circle" src="${app.imageUrl}" alt="" onerror="this.src='../images/Help.png'">
                    </div>
                    <div  class = "col-6">
                        <h3>${app.name}</h3>
                        <p>${app.desc}</p>
                        <p>${app.companyName}</p>
                        <p><b>${app.price}$</b></p>
                    </div>
                    <div class = "col-3 d-flex justify-content-center align-items-center">
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
    let filteredApps = await getAllApps();
    filteredApps = filteredApps.filter(app => app.name.toUpperCase().indexOf(filter) > -1);
    let appsHTML = "";
    filteredApps.map(app => appsHTML += generateAppHTML(app));

    appsContainer.innerHTML = appsHTML;
}

window.submitForm = async (event)=> {
    event.preventDefault();
    let forms = [...document.querySelectorAll('.form-control')];
    let app = getAppFromForm();

    if (!forms.every(form => !form.classList.contains('is-invalid'))) {
        event.stopPropagation();
        return;
    }

    app.id = getNextId();
    await addApp(app);
    let audio = new Audio('../sound.mp3');
    audio.play();
    refreshApps();
    $('#addAppModal').modal('hide');
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

window.nameFieldOnInputChange = (event)=>{
    validateName(event.target);
}