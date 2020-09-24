const checkForName = (inputText) => {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    console.log("checkForName");

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export default checkForName;
