import React from "react";
import {IDisplayProps} from "../../models/calculator.models";

import style from './display.module.sass';


const Display = (props: IDisplayProps) => {

    const upperDisplay: string[] = [];

    const numbers = props.upperDisplay.replace(/[^0-9.]/g, ' ')
        .split(' ')
        .filter(x => !isNaN(+x));

    const operators = props.upperDisplay.split('').filter(x => isNaN(+x) && x !== '.');

    numbers.map((num, i) => (upperDisplay.push(num, operators[i])));

    const mainDisplay = Number(props.mainDisplay).toLocaleString();
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div className={style.upperDisplay}>
                {upperDisplay.join(' ')}
            </div>
            <div className={style.mainDisplay}>{mainDisplay.length > 10 ? 'err' : mainDisplay}</div>

        </div>
    )
}

export default Display;
