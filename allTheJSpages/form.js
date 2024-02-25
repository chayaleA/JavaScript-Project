function login() {
    var login = document.getElementById('login');
    if (login.style.visibility === 'hidden') {
        login.style.visibility = 'visible';
    } else {
        login.style.visibility = 'visible';
    }
    if (localStorage.getItem('DETAILS')) {
        ExistPlayer();
    }
}

function keepToData() {
    // Retrieve existing player data from local storage
    const existingDataString = localStorage.getItem('DETAILS');
    let existingData = [];
    const selectedLevel = document.querySelector('input[name="select"]:checked').value;
    let choice = 0;
    if (selectedLevel === "easy") {
        choice = 1;
    } else if (selectedLevel === "hard")
        choice = 2;
    if (existingDataString) {
        // Parse the existing data from a string to an array
        existingData = JSON.parse(existingDataString);
        existingData[existingData.length - 1].level = choice;
    }
    else {
        // Add a new player to the existing data
        const newPlayer = {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
            score: 0,
            level: choice
        };
        existingData.push(newPlayer);
        // Save the updated data back to local storage
    }
    localStorage.setItem('DETAILS', JSON.stringify(existingData));

}
function ExistPlayer() {
    const existingDataString = localStorage.getItem('DETAILS');
    let names = [];

    names = JSON.parse(existingDataString);
    let n = names[names.length - 1]

    var login = document.getElementById("FormDetails")
    login.innerHTML = "Hi " + n.name

    var login = document.getElementById("FormDetails2")
    login.innerHTML = "Your high score is: " + n.score
}

function validateForm() {
    let x = document.forms["myForm"]["password"].value;
    if (x.length < 4) {
        alert("Password must be at least 4 charaters");
        document.getElementById('password').focus();
        return false;
    }
}

let arr = document.querySelectorAll("label");
arr.forEach(element => {
    element.style.color = "#33cc77"
});
