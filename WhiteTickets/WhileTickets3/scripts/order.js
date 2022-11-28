let bill_code;


async function user_load() {
    const document_number = document.getElementById("DocumentNumber");
    const second_name = document.getElementById("SecondName");
    const first_name = document.getElementById("FirstName");
    const birthday = document.getElementById("BirthDay");

    // first_name.textContent = `Дата рождения: ${}`
    let user = await get_me(localStorage.getItem("token"));
    
    if (user) {
        document_number.textContent = `Номер документа: ${user.document_number}`;
        second_name.textContent = `Фамилия: ${user.last_name}`;
        first_name.textContent = `Имя: ${user.first_name}`;

        const user_documnet_number_input = document.getElementById("DocumentNumber_input");
        const user_second_name_input = document.getElementById("SecondName_input");
        const user_birthday_input = document.getElementById("UserDataBirth");
        const user_name_input = document.getElementById("UserName");
        user_documnet_number_input.value = user.document_number;
        user_second_name_input.value = user.last_name;
        user_documnet_number_input.disabled = true
        user_name_input.value = user.first_name;
        user_second_name_input.disabled = true
        user_birthday_input.disabled = true
        user_name_input.disabled = true
    }
    else {
        window.location = "./login.html"
    }

}
function concert_load() {
    const concert_price = document.getElementById("ConcertPrice");
    const concert_name = document.getElementById("ConcertName");
    const concert_date = document.getElementById("ConcertDate");
    const concert_time = document.getElementById("ConcertTime");
    const concert_img = document.getElementById("ConcertImage");

    ConcertName = findGetParameter("concert");
    if (ConcertName === "Анастасия Волочкова") concert_img.src = "./assets/anasvol.png";
    else if (ConcertName === "Ирина Алегрова") concert_img.src = "./assets/ialegrova.png";
    else if (ConcertName === "Надежда Бабкина") concert_img.src = "./assets/nbabkina.png";
    else if (ConcertName === "Олег Газманов") concert_img.src = "./assets/gazmanov.png";
    else if (ConcertName === "Сергей Шнуров") concert_img.src = "./assets/shnurov.png";
    else if (ConcertName === "Елена Ваенга") concert_img.src = "./assets/evaenga.png";
    else if (ConcertName === "Пелагея") concert_img.src = "./assets/pelagea.png";
    else if (ConcertName === "Лобода") concert_img.src = "./assets/loboda.png";
    else concert_img.src = "./assets/macan.jpeg";

    concert_time.textContent = `Начало концерта: ${ConcertName}`;
    concert_date.textContent = `Дата концерта: ${findGetParameter("date")}`;
    concert_price.textContent = `Цена: ${findGetParameter("price")}`;
    concert_name.textContent = findGetParameter("concert");
}
async function order() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    let user = await get_me(localStorage.getItem("token"));
    let guest = [];
    guest.push({
        "first_name": user.first_name,
        "last_name": user.last_name,
        "birth_date": "1990-02-20",
        "document_number": user.document_number
    })

    let add_guests = false;
    let guests_form = document.getElementsByClassName("form");
    if (guests_form.length !== 1) {
        for (let i =1; i < guests_form.length; i++) {
            if (guests_form[i].children[0].children[0].value && guests_form[i].children[1].children[0].value && guests_form[i].children[2].children[0].value && guests_form[i].children[3].children[0].value && guests_form[i].children[4].children[0].value) {
                if (guests_form[i].children[0].children[0].value.length >= 3)
                {
                    let courent_day = new Date();
                    let date = guests_form[i].children[2].children[0].value;
                    date = new Date(date);
                    let years = Math.floor(Math.abs(courent_day-date)/(1000*60*60*24*365));
    
                    if (years >= 18 ) {
                        if (guests_form[i].children[3].children[0].value.length >= 7) {
                            guest.push({
                                "first_name": guests_form[i].children[0].children[0].value,
                                "last_name": guests_form[i].children[1].children[0].value,
                                "birth_date": guests_form[i].children[2].children[0].value,
                                "document_number": guests_form[i].children[3].children[0].value
                            });
                            add_guests = true;
                        }
                        else show_error("Номер документа должен быть длинее 7 цифр");
                    }
                    else show_error("Гостю должно быть больше 18 лет");
                }
                else show_error("Имя должно быть длинее трех букв");
            }
            else show_error("Необходимо заполнить все поля");
        }
    }
    else add_guests = true;

    if (add_guests) {
        var raw = JSON.stringify({
            "concert": {
                "id": findGetParameter("concert_id"),
                "date": findGetParameter("date")
            },
            "guest": guest
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (!bill_code) {
            await fetch("http://tickets.сделай.site/api/order", requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                if (!result.error) {
                    bill_code = result.data.code;
                }
                else console.log(result.error)
            })
            .catch(error => console.log('error', error));
        }

        let guests_req = await get_concert(bill_code);

        let place_add = true;
        for (let i = 0; i < guests_req.length; i++) {
            let guest_id = guests_req[i].id;
            let guest_document_number = guests_req[i].document_number;
            let place;
            let place_row;

            for (let j = 0; j < guests_form.length; j++) {
                if (guests_form[j].children[3].children[0].value === guest_document_number && guests_form[j].style.display !== "none") {
                    place = guests_form[j].children[4].children[0].value;
                    place = place.split(".");
                    place_row = place[0];
                    place = place[1];

                    var raw = JSON.stringify({
                        "guest_id": guest_id,
                        "seat": `${place_row} row ${place} seat`
                    });

                    var requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    await fetch(`http://tickets.сделай.site/api/order/${bill_code}/seat`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        result = JSON.parse(result);
                        if (!result.error) {
                            guests_form[j].style.display = "none";
                        }
                        else {
                            show_error("Измените место оставшихся гостей");
                            place_add = false;
                            console.log(result.error)
                        }
                    })
                    .catch(error => console.log('error', error));
                    
                }
            }
        }
        if (place_add) {
            window.location = `./order_management.html?billcode=${bill_code}`
            show_error("");
        }
    }
}

document.getElementById("OrderEnd").addEventListener("click", order);
user_load();
concert_load();