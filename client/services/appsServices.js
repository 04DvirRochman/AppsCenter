
async function getAllApps(){
    let raw = "";

	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};

	try {
		const response = await fetch("http://localhost:4000/api/apps", requestOptions);
		const result = await response.json();
		return result;
	}
	catch (e) {
		console.log('error', e.message);
	}
}

async function getApp(id){
    let raw = "";

	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};

	try {
		const response = await fetch(`http://localhost:4000/api/apps/${id}`, requestOptions);
		const result = await response.json();
		return result;
	}
	catch (e) {
		console.log('error', e.message);
	}
}

async function editApp(app){
    let raw = JSON.stringify(app);

	let requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: raw,
		redirect: 'follow'
	};

	try {
		const response = await fetch(`http://localhost:4000/api/apps/`, requestOptions);
		console.log(response);
        return response;
	}
	catch (e) {
		alert('error', e);
	}
}

async function addApp(app){
    let raw = JSON.stringify(app);

	let requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: raw,
		redirect: 'follow'
	};

	try {
		const response = await fetch("http://localhost:4000/api/apps", requestOptions);
		console.log(response);
        return response;
	}
	catch (e) {
		alert('error', e);
	}
}

async function removeApp(id) {
    let requestOptions = {
		method: 'DELETE',
		redirect: 'follow'
	};

	try{
		let res = await fetch(`http://localhost:4000/api/apps/${id}`, requestOptions);
		console.log(res);
	}
	catch(e){
		console.log(e);
		alert(e);
	}
}

document.addEventListener("DOMContentLoaded", () => {
    
});

async function createTable(){
    try{
        query(`CREATE TABLE appcenter.applications(id int, imageUrl varchar(255), name varchar(255), price float, description varchar(255), companyName  varchar(255),createdAt time);`);
    }
    catch(e)
    {
        console.log(e);
    }
}

//export{createTable,removeApp,addApp,getAllApps};




let id = 6;

let applications = [
      {
          'id': "1",
          'imageUrl': "facebook.png",
          'name': "Facebook",
          'price': "2.99",
          'desc': "To see whats new in your friends life!",
          'companyName': "Facebook"
      },
      {
          'id': "2",
          'imageUrl': "twitter.png",
          'name': "Twitter",
          'price': "5",
          'desc': "To see whats new in your friends life!",
          'companyName': "TwitterC"
      },
      {
          'id': "3",
          'imageUrl': "instagram.jpg",
          'name': "Instagram",
          'price': "2",
          'desc': "To talk with your friends!",
          'companyName': "Instagram"
      },
      {
          'id': "4",
          'imageUrl': "waze.png",
          'name': "waze",
          'price': "6.66",
          'desc': "To go to see your friends!",
          'companyName': "Israel"
      },
      {
          'id': "5",
          'imageUrl': "Whatsapp.png",
          'name': "Whatsapp",
          'price': "7",
          'desc': "To talk to your friends!",
          'companyName': "facebook"
      },
      {
          'id': "6",
          'imageUrl': "getTaxi.png",
          'name': "GetTaxi",
          'price': "5.99",
          'desc': "To take a taxi!",
          'companyName': "KahMonit (C)"
      }
  ];