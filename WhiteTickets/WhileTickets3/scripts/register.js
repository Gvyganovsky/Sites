function registration() {
    const first_name = document.getElementById("FirstName").value;
    const second_name = document.getElementById("SecondName").value;
    const phone = document.getElementById("Phone").value;
    const document_number = document.getElementById("DocumentNumber").value;
    const password = document.getElementById("Password").value;
    const password_repeat = document.getElementById("PasswordRepeat").value;

    if (password === password_repeat) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Телефон и номер документа поменяны местами в ссвязи с ошибкой на backend
        var raw = JSON.stringify({
            "first_name": first_name,
            "last_name": second_name,
            "phone": phone,
            "document_number": document_number,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("http://tickets.сделай.site/api/register", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === "") {
                    window.location = "./login.html"
                }
                else {
                    result = JSON.parse(result).error.error;
                    if (result.first_name) show_error("Имя должно быть длинее 3 букв");
                    else if (result.last_name) show_error("Фамилия должна быть длинее 3 букв");
                    else if (result.document_number) show_error("Телефон должен быть длинее 7 цифр");
                    else if (result.phone[0] === "The phone must be at least 7 characters.") show_error("Номер документа должен быть длинее 7 цифр");
                    else if (result.phone[0] === "The phone has already been taken.") show_error("Номер телефона занят");
                    else if (result.password) show_error("Пароль должен быть длинее 7 знаков");
                }

            })
            .catch(error => console.log(error));
    }
    else show_error("Пароли не совпадают")

}


const reg_button = document.getElementById("RegistartionButton");
reg_button.addEventListener("click", registration);