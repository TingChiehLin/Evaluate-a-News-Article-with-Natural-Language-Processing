//import checkForName from './nameChecker';
const handleSubmitButton = document.getElementById('evaluate-button');

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

//Update UI
const updateUI = (data) => {
    const result = document.getElementById('results');
    data.array.forEach(element => {
        const newElement = document.createElement('div');
        newElement.innerHTML = `<p>${element}</p>`;
        result.appendChild(newElement);
    });
}

//userUrl
const handleSubmit = (event) => {
    event.preventDefault()
    //reset the results
    document.getElementById('results').innerHTML = '';
    const userUrl = document.getElementById('user-url').value;
    // check what text was put into the form field
    //let formText = document.getElementById('name').value
    //Client.checkForName(formText)
    
    console.log("::: Form Submitted :::")
    const data = sendHttpRequest('POST',userUrl);
    updateUI(data);

    // fetch('http://localhost:8080/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}

handleSubmitButton.addEventListener('click',handleSubmit);

export { handleSubmit }
