function slider() {

    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidseField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;

    const slider = document.querySelector('.offer__slider');


    let slidesIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slidesIndex}`;
    
        } else {
            total.textContent = slides.length;
            current.textContent = slidesIndex;
        }

    slidseField.style.width = slides.length * 100 + '%';
    slidseField.style.display = 'flex';
    slidseField.style.transition = '1s all';
    slidesWrapper.style.overflow = 'hidden';


    // slides.forEach(slide => {
    //     slide.style.width = width;
    // });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];

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

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        // dot.classList.add(dot);
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
        if(i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    


    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2)
        }

        slidseField.style.transform = `translateX(-${offset}px)`;

        if(slidesIndex == slides.length) {
            slidesIndex = 1
        } else {
            slidesIndex++;
        }


        if (slides.length < 10) {
            current.textContent = `0${slidesIndex}`;
        } else {
            current.textContent = slidesIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[slidesIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2)
        }

        slidseField.style.transform = `translateX(-${offset}px)`;

        if(slidesIndex == 1) {
            slidesIndex = slides.length;
        } else {
            slidesIndex--;
        }


        if (slides.length < 10) {
            current.textContent = `0${slidesIndex}`;
        } else {
            current.textContent = slidesIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[slidesIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidesIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidseField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slidesIndex}`;
            } else {
                current.textContent = slidesIndex;
            }

            dots.forEach(dot => {
                dot.style.opacity = '0.5';
            });
            dots[slidesIndex - 1].style.opacity = 1;
        });
    })


    // showSlides(slidesIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;

    // } else {
    //     total.textContent = slides.length;
    // }


    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slidesIndex = 1;
    //     }

    //     if(n < 1) {
    //         slidesIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     slides[slidesIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slidesIndex}`;
    
    //     } else {
    //         current.textContent = slidesIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slidesIndex += n); 
    //     // slidesIndex = slidesindex + n
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
    
}

export default slider;