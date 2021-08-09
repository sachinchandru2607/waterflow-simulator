import { useState } from "react";

/**
 * 
 * RangeSlider component is get the user input as a slider widget
 */

const RangeSlider = ({heading, handleChange}) => {

    const [slideValue, setSlideValue] = useState(10);

    return (
        <div className = "range-slider">
        <label>{heading}</label>
        <input onChange = {(e) => {
                setSlideValue(e.target.value);
                handleChange(e);
            }} 
            type = "range"
            min = "1" 
            max = "10" 
            value = {slideValue} 
        />
        <div>
        <label className = "range-slider-min">1</label><label className = "range-slider-max">{slideValue}</label>
        </div>
        </div>
    );

};

export default RangeSlider;