import React, { useState, useEffect } from 'react';
import { SliderData } from './sliderData';

const ImageSlider = ({ slides }) => { 
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prevCurrent => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
        }, 7000); // Change slide every 7 seconds

        return () => clearInterval(timer); // Clear timer on component unmount
    }, [length]);

    return (
        <>
            {SliderData.map((slide, index) => {
                return <img src = {slide.image} alt = 'Shiley Photo' className={`Homeimage ${index === current ? 'fade-in' : 'fade-out'}`} />;
            })}
        </>
    );
};

export default ImageSlider;