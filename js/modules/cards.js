import {getResource} from '../services/services.js';

function cards() {
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
    
    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
}

export default cards;