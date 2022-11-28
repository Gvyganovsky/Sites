function logout() {
    localStorage.removeItem("token");
    window.location = "./index.html"
}

async function user() {
    const first_name = document.getElementById("FirstName");
    const second_name = document.getElementById("SecondName");
    const score = document.getElementById("Scores");

    let user = await get_me(localStorage.getItem("token"));
    first_name.textContent = `Имя: ${user.first_name}`;
    second_name.textContent = `Фамилия: ${user.last_name}`;
    score.textContent = `Количество баллов: ${Math.floor(Math.random() * (1000 - 100 + 1) + 100)} баллов`;
}

user();
const logout_button = document.getElementById("LogoutButton");
logout_button.addEventListener("click", logout);