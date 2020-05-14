import React from "react";

import CalculatorKey from "../calculatorKey/calculatorKey";

import {IKeyPadProps} from "../../models/calculator.models";
import style from './keyPad.module.sass';

const KeyPad = (props: IKeyPadProps) => {
    return (
        <div className={style.calculatorKeys}>

            <CalculatorKey class={style.keyOperator}
                           handleClick={props.onInputEvent}
                           value={'+'}
                           displayValue={'+'}/>
            <CalculatorKey class={style.keyOperator}
                           handleClick={props.onInputEvent}
                           value={'-'}
                           displayValue={'-'}/>
            <CalculatorKey class={style.keyOperator}
                           handleClick={props.onInputEvent}
                           value={'*'}
                           displayValue={'x'}/>
            <CalculatorKey class={style.keyOperator}
                           handleClick={props.onInputEvent}
                           value={'/'}
                           displayValue={'÷'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'7'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'8'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'9'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'4'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'5'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'6'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'1'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'2'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'3'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'0'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'.'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onInputEvent} value={'C'}/>
            <CalculatorKey class={style.calculatorKeys} handleClick={props.onSaveEvent} value={'SAVE'}/>
            <CalculatorKey
                class={style.keyEqual}
                handleClick={props.onEvaluateEvent}
                value={'='}/>
        </div>

    )
}

export default KeyPad;