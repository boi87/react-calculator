import React from "react";

import {ICalculatorKeyProps} from "../../models/calculator.models";

const CalculatorKey = (props: ICalculatorKeyProps) => {
    return (
        <button
            className={props.class}
            onClick={() => props.handleClick({value: props.value, displayValue: props.displayValue})}>
            {props.displayValue || props.value}
        </button>
    )
};


export default CalculatorKey;