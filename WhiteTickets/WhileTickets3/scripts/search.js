function open_search() {
    const nav_buttons = document.getElementsByClassName("nav_btn");
    const nav = document.getElementById("nav_menu");


    nav_buttons[0].style["pointer-events"] = "none";
    nav_buttons[1].style["pointer-events"] = "none";
    nav_buttons[2].style["pointer-events"] = "none";
    nav_buttons[3].style["pointer-events"] = "none";

    nav_buttons[0].style.opacity = 0;
    nav_buttons[1].style.opacity = 0;
    nav_buttons[2].style.opacity = 0;
    nav_buttons[3].style.opacity = 0;

    setTimeout(() => { 
        nav_buttons[0].remove();
        nav_buttons[0].remove();
        nav_buttons[0].remove();
        nav_buttons[0].remove();


        const search_block = document.createElement("div");
        search_block.style.width = "min(100%, 540px)";

        const concert_type = document.createElement("div");
        const people_count = document.createElement("div");
        const search_btn = document.createElement("div");
        const date_st = document.createElement("div");
        const date_pt = document.createElement("div");


        const date_st_input = document.createElement("input");
        const date_st_label = document.createElement("p");
        date_st_label.textContent = "Дата от";
        date_st_input.type = "date";
        date_st.appendChild(date_st_label);
        date_st.appendChild(date_st_input);

        const date_pt_input = document.createElement("input");
        const date_pt_label = document.createElement("p");
        date_pt_label.textContent = "Дата до";
        date_pt_input.type = "date";
        date_pt.appendChild(date_pt_label);
        date_pt.appendChild(date_pt_input);

        const type_input = document.createElement("select");
        const type_input_op1 = document.createElement("option");
        const type_input_op2 = document.createElement("option");
        const type_input_op3 = document.createElement("option");
        const type_input_op4 = document.createElement("option");
        const type_input_op5 = document.createElement("option");
        const type_input_op6 = document.createElement("option");
        const type_label = document.createElement("p");
        type_input_op1.textContent = "Классика";
        type_input_op2.textContent = "Рок";
        type_input_op3.textContent = "Джаз";
        type_input_op4.textContent = "народная/фолк";
        type_input_op5.textContent = "Хип-хоп";
        type_input_op6.textContent = "Другое";
        type_label.textContent = "Тип концерта";
        type_input.appendChild(type_input_op1);
        type_input.appendChild(type_input_op2);
        type_input.appendChild(type_input_op3);
        type_input.appendChild(type_input_op4);
        type_input.appendChild(type_input_op5);
        type_input.appendChild(type_input_op6);
        concert_type.appendChild(type_label);
        concert_type.appendChild(type_input);
        
        const people_count_input = document.createElement("input");
        const people_count_label = document.createElement("p");
        people_count_label.textContent = "Колличество людей";
        people_count_input.type = "number";
        people_count_input.value = 1;
        people_count.appendChild(people_count_label);
        people_count.appendChild(people_count_input);


        const search_btn_logo = document.createElement("span");
        const search_btn_label = document.createElement("p");
        search_btn_label.textContent = "Искать";
        search_btn.appendChild(search_btn_label);
        search_btn.appendChild(search_btn_logo);

        search_block.className = "search search__content"
        people_count.className = "search__input";
        concert_type.className = "search__select";
        search_btn.className = "search_block search_btn";
        date_st.className = "search__input";
        date_pt.className = "search__input";


        search_block.appendChild(date_st);
        search_block.appendChild(date_pt);
        search_block.appendChild(concert_type);
        search_block.appendChild(people_count);
        search_block.appendChild(search_btn);
        nav.appendChild(search_block);

        search_btn.addEventListener("click", () => {
            if (date_st_input.value && date_pt_input.value)
                window.location = `./search.html?people_count=${people_count_input.value}?type=${type_input.value}?date_st=${date_st_input.value}?date_en=${date_pt_input.value}`;
        });


        setTimeout(() => {
            concert_type.style.width = "min(100%, 540px)";
            people_count.style.width = "min(100%, 540px)";
            search_btn.style.width = "min(100%, 540px)";
            date_st.style.width = "min(100%, 540px)";
            date_pt.style.width = "min(100%, 540px)";
        }, 1000);

    }, 1000);

}
function sortByProperty(property){
    return function(a,b){
        if(a[property] > b[property])
            return 1;
        else if(a[property] < b[property])
            return -1;
        return 0;
    }
}
function clear_concerts() {
    const concert_container = document.getElementById("stocks")
}
async function search_handler() {
    const concert_container = document.getElementById("stocks")
    let count_concert = 0;
    let search_result = await search_req();
    search_result = search_result.data.concert
    search_result.sort(sortByProperty("date_concert"))


    search_result.forEach(element => {
        const min_price = document.getElementById("price_min").value;
        const max_price = document.getElementById("price_max").value;
        let count_selected_concert = 0;
        search_result.forEach(concert => { if (!(concert.price > max_price || concert.price < min_price)) count_selected_concert++; });

        if (!(element.price > max_price || element.price < min_price)) {
            const concert_button = document.createElement("button");
            const concert_lines_img = document.createElement("img");
            const concert_div_text = document.createElement("div");
            const concert_duration = document.createElement("p");
            const concert_number = document.createElement("p");
            const concert_scores = document.createElement("p");
            const concert_div = document.createElement("div");
            const concert_img = document.createElement("img");
            const concert_price = document.createElement("p");
            const concert_lable = document.createElement("p");
            const concert_date = document.createElement("p");
            const concert_time = document.createElement("p");


            concert_button.addEventListener("click", () => {
                window.location = `./order.html?concert=${element.name_concert}?date=${element.date_concert}?time=${element.time_start}?price=${element.price}?concert_id=${element.id}`
            })

            if (element.name_concert === "Анастасия Волочкова") concert_img.src = "./assets/volockova.png";
            else if (element.name_concert === "Ирина Алегрова") concert_img.src = "./assets/alegrova.png";
            else if (element.name_concert === "Надежда Бабкина") concert_img.src = "./assets/nbabkina.png";
            else if (element.name_concert === "Олег Газманов") concert_img.src = "./assets/gazmanov.png";
            else if (element.name_concert === "Сергей Шнуров") concert_img.src = "./assets/shnurov.png";
            else if (element.name_concert === "Елена Ваенга") concert_img.src = "./assets/evaenga.png";
            else if (element.name_concert === "Пелагея") concert_img.src = "./assets/pelagea.png";
            else if (element.name_concert === "Лобода") concert_img.src = "./assets/loboda.png";
            else concert_img.src = "./assets/macan.jpeg";
            
            concert_lines_img.src = "./assets/vawes-grey.png";

            concert_button.className = "personal__account-btn buttonConcert"
            concert_div_text.className = "stocks_text";
            concert_lable.className = "stock_lable";
            concert_lines_img.className = "lines";
            concert_img.className = "concert__img"

            concert_scores.className = "search__text-date"
            concert_duration.className = "search__text-add"
            concert_number.className = "search__text-add"
            concert_date.className = "search__text-add"
            concert_time.className = "search__text-add"
            concert_price.className = "search__text-add"
            concert_lable.className = "search__text" 


            let score = 0;
            if (element.price >= 500) score = 1;
            if (element.price >= 1000) score = 2;
            if (element.price >= 1500) score = 3;
            if (element.price >= 2000) score = 5;
            concert_scores.textContent = `Баллы: ${score}`
            concert_duration.textContent = `Длительность концерта: ${element.duration}`;
            concert_number.textContent = `Номер концерта: ${element.concert_code}`;
            concert_date.textContent = `Дата концерта: ${element.date_concert}`;
            concert_time.textContent = `Начало концерта: ${element.time_start}`;
            concert_price.textContent = `Цена билета: ${element.price}`;
            concert_lable.textContent = element.name_concert;
            concert_button.textContent = "Купить";


            if (count_concert%2 !== 0) concert_div.className = "reverse";
            else if (count_concert === 0) {
                concert_div.className = "start";
            };


            concert_div_text.appendChild(concert_lable);
            concert_div_text.appendChild(concert_lines_img);
            concert_div_text.appendChild(concert_number);
            concert_div_text.appendChild(concert_date);
            concert_div_text.appendChild(concert_time);
            concert_div_text.appendChild(concert_duration);
            concert_div_text.appendChild(concert_price);
            concert_div_text.appendChild(concert_scores);
            concert_div_text.appendChild(concert_button);

            concert_div.appendChild(concert_img);
            concert_div.appendChild(concert_div_text);
            concert_container.appendChild(concert_div);
        }
    });
}

document.getElementById("search_btn").addEventListener('click', open_search);

let page = window.location.href.split("?")[0].split("/");
page = page[page.length-1];

if (page === "search.html") {
    search_handler();
    document.getElementById("price_min").addEventListener("change", search_handler);
    document.getElementById("price_max").addEventListener("change", search_handler);
}
