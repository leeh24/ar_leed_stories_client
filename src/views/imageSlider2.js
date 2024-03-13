import React, { useState, useEffect } from 'react';
import { SliderData } from './sliderData';

const ImageSlider2 = ({ slides }) => { 
    const [current, setCurrent] = useState(0);
    //const length = slides.length;
    const length = 3;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prevCurrent => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
        }, 10000); // Change slide every 7 seconds

        return () => clearInterval(timer); // Clear timer on component unmount
    }, [length]);


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    const scrollDown = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };


    return (
        <>
            {SliderData.map((slide, index) => {
                return <img src = {slide.image} alt = 'Shiley Photo' style={{ filter: 'blur(7px)'}} className={`Homeimage ${index === current ? 'fade-in' : 'fade-out'}`} />;
            })}
        </>
    );
};

export default ImageSlider2;
