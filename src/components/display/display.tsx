import React from "react";

import {IDisplayProps} from "../../models/calculator.models";

import './display.sass';

const Display = (props: IDisplayProps) => {

    const thousandsSeparatorRgx = /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g;
    const leadingZerosRgx = /^[0]+/g;
    const numsAndDecimalDotRgx = /[^0-9.]/g;

    const formatNumbers = (num: string) => (num.toString().replace(thousandsSeparatorRgx, '$1,'));

    const numbers = props.upperDisplay.replace(numsAndDecimalDotRgx, ' ').split(' ').filter(num => !isNaN(+num));
    const operators = props.upperDisplay.split('').filter(op => isNaN(+op) && op !== '.');

    const mainDisplay = formatNumbers(props.mainDisplay).substr(0, 15);

    const upperDisplay: string[] = [];
    numbers.map((num, i) => upperDisplay.push(formatNumbers(num.replace(leadingZerosRgx, "")), operators[i]));

    return (
        <div className={'displaysContainer'}>
            <div className={'upperDisplay'}>
                <span>{upperDisplay.join(' ')}</span>
            </div>
            <div className={'mainDisplay'}>
                <span>{mainDisplay}</span>
            </div>
            {props.saved ?
                <div className={'successMessageDisplay'}>SAVED!</div>
                : null
            }
        </div>
    )
};

export default Display;
