import React from "react";

import CalculatorKey from "../calculatorKey/calculatorKey";

import {IKeyPadProps} from "../../models/calculator.models";

import './keyPad.sass';

const KeyPad = (props: IKeyPadProps) => {
    return (
        <div className={'keyPadKeysContainer'}>

            <CalculatorKey class={'keyAc'} handleClick={props.onInputEvent} value={'AC'}/>
            <CalculatorKey
                class={props.currentResult === '' ? 'keySaveDisabled' : 'keySaveEnabled'}
                handleClick={props.onSaveEvent}
                value={'SAVE'}
                currentResult={props.currentResult}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'/'}
                           displayValue={'÷'}/>

            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'.'}/>
            <CalculatorKey class={'keyZero'} handleClick={props.onInputEvent} value={'0'}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'*'}
                           displayValue={'x'}/>

            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'1'}/>
            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'2'}/>
            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'3'}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'-'}
                           displayValue={'-'}/>

            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'4'}/>
            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'5'}/>
            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'6'}/>
            <CalculatorKey class={'keyOperator'}
                           handleClick={props.onInputEvent}
                           value={'+'}
                           displayValue={'+'}/>

            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'7'}/>
            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'8'}/>
            <CalculatorKey class={'standardKey'} handleClick={props.onInputEvent} value={'9'}/>
            <CalculatorKey
                class={'keyOperator'}
                handleClick={props.onEvaluateEvent}
                value={'='}/>


        </div>

    )
}

export default KeyPad;