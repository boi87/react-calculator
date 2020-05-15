import React from "react";
import {IDisplayProps} from "../../models/calculator.models";

import style from './display.module.sass';


const Display = (props: IDisplayProps) => {

    const formatNumbers = (num: string) => num.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');

    const numbers = props.upperDisplay.replace(/[^0-9.]/g, ' ').split(' ').filter(x => !isNaN(+x));
    const operators = props.upperDisplay.split('').filter(x => isNaN(+x) && x !== '.');

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
}

export default Display;
