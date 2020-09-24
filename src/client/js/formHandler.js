import fetch from 'node-fetch';
import checkForName from './nameChecker';

const updateUI = (data) => {
    const resultDiv = document.getElementById('results');
    Object.keys(data).forEach(key =>{
		const divElement = document.createElement('div');
		divElement.classList.add(`${key}`);
		divElement.innerHTML = `<p><strong>${key}: </strong> ${data[key]}</p>`;
		resultDiv.appendChild(divElement);
	});
}

const getUserUrl = () => {
    const userUrl = document.getElementById('user-url').value;
    return userUrl;
}

const handleError = (err) => {
    if (err.message) {
        console.log(err.message);
    } else {
        console.log("Somthing went wrong!");
    }
}

//handle request 
const sendHttpRequest = (method, url='', data) => {
    return fetch(url,{
        method: method,
        body: data,
    }).then(response => {
        if(response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then(errData => {
                console.log(errData);
                throw new Error('Server went wrong');
            });
        }
    });
}

//userUrl
const handleSubmit = (event) => {
    event.preventDefault()
    //reset the results
    document.getElementById('results').innerHTML = '';
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
    const url = getUserUrl();
    const data = sendHttpRequest('POST',url);
    updateUI(data);
    // fetch('http://localhost:8080/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}

export { handleSubmit }
