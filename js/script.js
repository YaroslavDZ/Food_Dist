window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (item, i) => {
               if(target == item) {
                   hideTabContent();
                   showTabContent(i);
               } 
            });
        }
    });

    //Timer
    let deadline = '2021-08-30';

    function getTimeRemaining(endtime) {
        const diffTime = Date.parse(endtime) - new Date(),
              days = Math.floor(diffTime / (1000 * 3600 * 24)),
              hours = Math.floor((diffTime / (1000 * 3600)) % 24),
              minutes = Math.floor((diffTime / 1000 / 60) % 60),
              seconds = Math.floor((diffTime / 1000) % 60);

        return {
            total: diffTime,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function setZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let diffTime = getTimeRemaining(endtime);

            days.textContent = setZero(diffTime.days);
            hours.textContent = setZero(diffTime.hours);
            minutes.textContent = setZero(diffTime.minutes);
            seconds.textContent = setZero(diffTime.seconds);

            if (diffTime <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
});