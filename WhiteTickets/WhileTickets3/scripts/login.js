function login() {
    const phone = document.getElementById("Phone").value;
    const password = document.getElementById("Password").value;
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "phone": phone,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://tickets.сделай.site/api/login", requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result);
        if (result.data) {
            localStorage.setItem("token", result.data.token)
            window.location = "./profile.html"
        }
        else show_error("Неверный номер телефона или пароль")
    })
    .catch(error => console.log('error', error));
}

async function auth_check() {
    if (localStorage.getItem("token")) {
        let user = await get_me(localStorage.getItem("token"));
        if (user) window.location = "./profile.html";
    }
}

auth_check();
const login_button = document.getElementById("LoginButton");
login_button.addEventListener("click", login);
