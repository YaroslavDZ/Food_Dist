function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const offerSlide = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          offerSliderPrev = document.querySelector(prevArrow),
          offerSliderNext = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width,
          dots = [];

    let currentSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter);

    let offset = 0,
        indexSlide = (offset / +width.slice(0, width.length - 2)) + 1;

    slidesField.style.width = 100 * offerSlide.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    offerSlide.forEach(slide => {
        slide.style.width = width;
    });

    currentSlide.textContent = setZero(1);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < offerSlide.length; ++i) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        indicators.append(dot);
        dots.push(dot);
        dots[0].style.opacity = '1';
    }

    slider.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName == 'LI') {
            while (+currentSlide.textContent != +target.dataset.slideTo) {
                nextSlide();
            }
        
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        target.style.opacity = '1';
        }
    });



    offerSliderNext.addEventListener('click', () => {
        nextSlide();
    });

    offerSliderPrev.addEventListener('click', () => {
        prevSlide();
    });

    function deleteExceptDigits(str) {
        return str.replace(/\D/g, '');
    }

    function nextSlide() {
        if (offset == +deleteExceptDigits(width) * (offerSlide.length - 1)) {
            offset = 0;
        } else {
            offset += +deleteExceptDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        currentSlide.textContent = setZero((offset / +deleteExceptDigits(width)) + 1);

        dots.forEach(dot => {
            if (dot.dataset.slideTo == +currentSlide.textContent) {
                dot.style.opacity = '1';
            } else {
                dot.style.opacity = '.5';
            }
        });
    }

    function prevSlide() {
        if(offset == 0) {
            offset = +deleteExceptDigits(width) * (offerSlide.length - 1);
        } else {
            offset -= +deleteExceptDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        currentSlide.textContent = setZero((offset / +deleteExceptDigits(width)) + 1);

        dots.forEach(dot => {
            if (dot.dataset.slideTo == +currentSlide.textContent) {
                dot.style.opacity = '1';
            } else {
                dot.style.opacity = '.5';
            }
        });
    }

    function setZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }
}

export default slider;