import React from "react";
import style from "../Calculator/calculator.module.sass";
import CalculatorKey from "../calculatorKey/calculatorKey";
import {IKeyPadProps} from "../../models/calculator.models";

const KeyPad = (props: IKeyPadProps) => {
    return (
        <div className={style.calculatorKeys}>

            <CalculatorKey class={style.keyOperator} handleClick={props.onInputEvent} value={'+'}
                           displayValue={'+'}/>
            <CalculatorKey class={style.keyOperator} handleClick={props.onInputEvent} value={'-'}
                           displayValue={'-'}/>
            <CalculatorKey class={style.keyOperator} handleClick={props.onInputEvent} value={'*'}
                           displayValue={'x'}/>
            <CalculatorKey class={style.keyOperator} handleClick={props.onInputEvent} value={'/'}
                           displayValue={'÷'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'7'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'8'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'9'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'4'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'5'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'6'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'1'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'2'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'3'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'0'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'.'}/>
            <CalculatorKey handleClick={props.onInputEvent} value={'C'}/>
            <CalculatorKey handleClick={props.onSaveEvent} value={'SAVE'}/>
            <CalculatorKey class={style.keyEqual} handleClick={props.onEvaluateEvent} value={'='}/>
        </div>

    )
}

export default KeyPad;