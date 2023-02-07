
window.addEventListener('DOMContentLoaded', function () {


    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    // timer
    let deadline = '2023-02-10';
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());  // отнимаем от конечной даты текущую в милисекундах
        let seconds = Math.floor((t / 1000) % 60);         // Math.floor - округляем до целого числа, t / 1000 - делаем из милисекунд - секунды, %60 - остаток от дедения на 60 секунд
        let minutes = Math.floor((t / 1000 / 60 % 60));    // получаем кол-во часов и остаток в минутах
        let hours = Math.floor((t / 1000 / 60 / 60) % 24);    // часы
        let days = Math.floor((t / (1000 * 60 * 60 * 24)));    // дни
        return {
            'total': t,
            'days': days + 'дней',
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;


            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }
    setClock('timer', deadline);

    // modal

    let more = document.querySelector('.more'),      // кнопка
        overlay = document.querySelector('.overlay'), // блок окна
        close = document.querySelector('.popup-close'), // крестик закрытия
        moreTab = this.document.querySelectorAll('.description-btn');

    moreTab.forEach(function (item, mass) {
        item.addEventListener('click', function () {
            overlay.style.display = "block";
            document.body.style.overflow = 'hidden';  //отмена прокрутки страницы при появлении модального окна
            this.classList.add('more-splash');    // добавлени анимации на кнопку
        });

    });

    more.addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('more-splash');    // добавлени анимации на кнопку
        document.body.style.overflow = 'hidden';  //отмена прокрутки страницы при появлении модального окна
    });
    close.addEventListener('click', function () {
        overlay.style.display = "none";
        more.classList.add('more-splash');
        document.body.style.overflow = '';  //разрешить прокрутку страницы при появлении модального окна
    });

    // Form
    // let message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Скоро мы с вами свяжемся!',
    //     failure: 'Что-то пошло не так...'
    // };

    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div');

    // statusMessage.classList.add('status');

    // form.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     form.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();// создаем объект для работы с ajax запросами
    //     request.open('POST', 'server.php');// указали метод и путь к файлу, относительно index.html
    //     request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');// указываем, что контент будет содержать данные, полученые из формы

    //     let formData = new FormData(form); // метод FormData - получает данные из формы в виде ключ- значение, при этом в инпуте должны быть атрибуты name="phone или другое", но name - обязательно
    //     request.send(formData); // открывает соединение и отправляет запрос на сервер- это тело запроса - возможный аргумент  body
    //     request.addEventListener('readystatechange', function () {
    //         if (request.readyState < 4) {    // если readyState не выполнился полностью, т.е <4
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) { // если readyState выполнился полностью, т.е = 4
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;// или какая-то ошибка
    //         }
    //     });

    //     for (let i = 0; i < input.length; i++) { // перебираем все инпуты
    //         input[i].value = '';  // и очищаем их значения
    //     }
    // });    // передача с помощью formData


    // передача с помощью JSON
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contactForm = document.getElementById('form'),
        inputs = contactForm.getElementsByTagName('input');
    // input = contactForm.getElementsByTagName('input');


    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(contactForm);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    });
}); 