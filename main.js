

const getData = () => {
    if (localStorage.getItem('applications') == null) {
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('id', id);
    }

    return JSON.parse(localStorage.getItem('applications'));
}

const getApllications= () => {
    return JSON.parse(localStorage.getItem('applications'));
}

document.addEventListener("DOMContentLoaded", () => {

});

window.onload = () => {
    //localStorage.clear();
    getData();
    refreshApps();
    let form = document.querySelector('.needs-validation');
    form.addEventListener('submit',event=> submitForm(event));
    //document.querySelector('#addApp').addEventListener('click',event=>changePage(event));
}

function remove(){
    let aud = new Audio('./sound.mp3');
    aud.play();
}

function refreshApps(){
    document.querySelector('#appsContainer').innerHTML = '';
    let appsHTML = "";
    getApllications().map((app)=>appsHTML += generateAppHTML(app));

    let appsContainer = document.querySelector('#appsContainer');
    appsContainer.innerHTML = appsHTML;
}

function generateAppHTML(app) {
    if(app.desc === ''){
        app.desc = "this app does not have a description";
    }
    if(app.companyName === ''){
        app.companyName = "this app does not have company";
    }
    return `
    <div class="card" >
                <div class="row">
                    <div class = "col-3">
                        <img style=" border: none; width: 150px; height: 150px" class="img-thumbnail rounded-circle" src="./images/${app.id}/${app.imageUrl}" alt="" onerror="this.src='images/Help.png'">
                    </div>
                    <div  class = "col-5">
                        <h3>${app.name}</h3>
                        <p>${app.desc}</p>
                        <p>${app.companyName}</p>
                        <p><b>${app.price}$</b></p>
                    </div>
                    <div class = "col-3  ">
                        <div  class="row">
                        <p></p>
                            <div class="card-body align-items-center d-flex justify-content-center">
                                <button onclick="removeItemFromTheList(${app.id})" type="button" class="mb-3 mt-3 btn btn-danger rounded-circle">🗑</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    `;
}

function searchApp(){
    let appsContainer = document.querySelector('#appsContainer');
    appsContainer.innerHTML = null;
    let searchBar = document.querySelector('#searchBar');
    let filter = searchBar.value.toUpperCase();
    filteredApps = getApllications().filter(app=>app.name.toUpperCase().indexOf(filter) > -1);
    filteredApps.map(app=>generateAppHTML(app));
    
}

function changePage(event){
    event.preventDefault();
    window.location.href='./addApplication.html';
}