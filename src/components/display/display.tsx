import React from "react";
import {IDisplayProps} from "../../models/calculator.models";

import style from './display.module.sass';


const Display = (props: IDisplayProps) => {

    const thousandsSeparatorRgx = /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g;
    const formatNumbers = (num: string) => num.replace(thousandsSeparatorRgx, '$1,');

    const numsAndDecimalDotRgx = /[^0-9.]/g;
    const numbers = props.upperDisplay.replace(numsAndDecimalDotRgx, ' ').split(' ').filter(num => !isNaN(+num));
    const operators = props.upperDisplay.split('').filter(op => isNaN(+op) && op !== '.');

    const mainDisplay = formatNumbers(props.mainDisplay).substr(0, 12);

    const upperDisplay: string[] = [];
    numbers.map((num, i) => upperDisplay.push(formatNumbers(num), operators[i]));

    return (
        <div className={style.displaysContainer}>
            <div className={style.upperDisplay}>
                {upperDisplay.join(' ')}
            </div>
            <div className={style.mainDisplay}>
                {mainDisplay}
            </div>
                {props.saved ?
                    <div className={style.successMessage}>SAVED!</div>
                    : null
                }
        </div>
    )
};

export default Display;
