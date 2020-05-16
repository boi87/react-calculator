import React from "react";
import {IDisplayProps} from "../../models/calculator.models";

import style from './display.module.sass';


const Display = (props: IDisplayProps) => {

    const thousandsSeparatorRgx = /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g;
    const formatNumbers = (num: string) => num.replace(thousandsSeparatorRgx, '$1,');

    const numsAndDecimalDotRgx = /[^0-9.]/g;
    const numbers = props.upperDisplay.replace(numsAndDecimalDotRgx, ' ').split(' ').filter(num => !isNaN(+num));
    const operators = props.upperDisplay.split('').filter(op => isNaN(+op) && op !== '.');

    const mainDisplay = formatNumbers(props.mainDisplay);

    const upperDisplay: string[] = [];
    numbers.map((num, i) => upperDisplay.push(formatNumbers(num), operators[i]));

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div className={style.upperDisplay}>
                {upperDisplay.join(' ')}
            </div>
            <div className={style.mainDisplay}>{mainDisplay.length > 13 ? 'it\'s too long!' : mainDisplay}</div>

        </div>
    )
};

export default Display;
