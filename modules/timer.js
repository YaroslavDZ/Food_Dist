function timer() {
    let deadline = '2021-012-30';

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

            if (diffTime.total <= 0) {
                days.textContent = setZero(0);
                hours.textContent = setZero(0);
                minutes.textContent = setZero(0);
                seconds.textContent = setZero(0);
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

export default timer;