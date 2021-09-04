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

    //Modal
    const modalTrigger = document.querySelectorAll('.btn'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('.modal__close');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //classes of cards
    class Card {
        constructor(imageSrc, alt, menuName, menuDescription, price, parentSelector, ...classes) {
            this.imageSrc = imageSrc;
            this.alt = alt;
            this.menuName = menuName;
            this.menuDescription = menuDescription;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <div class="menu__item">
                    <img src="${this.imageSrc}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.menuName}</h3>
                    <div class="menu__item-descr">${this.menuDescription}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new Card(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu__field .container'
    ).render();

    new Card(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        27,
        '.menu__field .container'
    ).render();

    new Card(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu__field .container'
    ).render();

    const form = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так',
    };

    form.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            //request.setRequestHeader('Content-type', 'multipart/form-data');
            
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status == 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});