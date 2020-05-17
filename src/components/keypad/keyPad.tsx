import React from "react";

import CalculatorKey from "../calculatorKey/calculatorKey";

import {IKeyPadProps} from "../../models/calculator.models";

import './keyPad..sass';

const KeyPad = (props: IKeyPadProps) => {
    return (
        <div className={'calculatorKeys'}>

            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'+'}
                           displayValue={'+'}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'-'}
                           displayValue={'-'}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'*'}
                           displayValue={'x'}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'/'}
                           displayValue={'÷'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'7'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'8'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'9'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'4'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'5'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'6'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'1'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'2'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'3'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'0'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'.'}/>
            <CalculatorKey class={'calculatorKeys'} handleClick={props.onInputEvent} value={'AC'}/>
            <CalculatorKey
                class={'keySave'}
                handleClick={props.onSaveEvent}
                value={'SAVE'}
                currentResult={props.currentResult}/>
            <CalculatorKey
                class={'keyEqual'}
                handleClick={props.onEvaluateEvent}
                value={'='}/>
        </div>

    )
}

export default KeyPad;