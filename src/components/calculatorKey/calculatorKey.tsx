import React from "react";

import {ICalculatorKeyProps} from "../../models/calculator.models";

import './calculatorKey.sass';

const CalculatorKey = (props: ICalculatorKeyProps) => {
    return (
        <button
            color={'green'}
            disabled={props.currentResult === ''}
            className={props.class}
            onClick={() => props.handleClick({value: props.value, displayValue: props.displayValue})}>
            {props.displayValue || props.value}
        </button>
    )
};


export default CalculatorKey;