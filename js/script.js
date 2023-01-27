
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
        close = document.querySelector('.popup-close'); // крестик закрытия

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
}); 