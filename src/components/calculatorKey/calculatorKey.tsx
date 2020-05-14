import React from "react";

import {CalculatorKeyProps} from "../../models/calculator.models";

const CalculatorKey = (props: CalculatorKeyProps) => {
    return (
        <button
            className={props.class}
            onClick={() => props.handleClick({value: props.value, displayValue: props.displayValue})}>
            {props.displayValue || props.value}
        </button>
    )
};


export default CalculatorKey;