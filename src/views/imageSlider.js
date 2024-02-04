import React, { useState, useEffect } from 'react';
import { SliderData } from './sliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';

const ImageSlider = ({ slides }) => { 
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prevCurrent => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
        }, 7000); // Change slide every 7 seconds

        return () => clearInterval(timer); // Clear timer on component unmount
    }, [length]);


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    return (
        <>
            <FaArrowAltCircleLeft className='left-arrow' onClick={ prevSlide } />
            <FaArrowAltCircleRight className='right-arrow' onClick={ nextSlide } />
            
            {SliderData.map((slide, index) => {
                return <img src = {slide.image} alt = 'Shiley Photo' className={`Homeimage ${index === current ? 'fade-in' : 'fade-out'}`} />;
            })}
        </>
    );
};

export default ImageSlider;