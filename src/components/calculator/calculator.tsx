import React from "react";

import style from './calculator.module.sass';
import {CalculatorState} from "../../models/calculator.models";
import CalculatorKey from "../buttons/calculatorKey/calculatorKey";


class Calculator extends React.Component<any, CalculatorState> {

    readonly state: Readonly<CalculatorState> = {
        calculator: {
            upperDisplay: ' ',
            display: '0',
            operator: ''
        },
        saving: false
    };

    addToInput = (input: string) => {
        console.log(this.state);
        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    upperDisplay: state.calculator.upperDisplay + input
                }
            })
        )

    };

    evaluate = () => {

    };


    render() {
        return (
            <div>
                <div className={style.calculator}>
                    <div className={style.calculatorUpperDisplay}>
                        {this.state.calculator.upperDisplay}
                    </div>
                    <div className={style.calculatorDisplay}>{this.state.calculator.display}</div>

                    <div className={style.calculatorKeys}>

                        <CalculatorKey class={style.keyOperator} handleClick={this.addToInput} value={'+'}
                                       displayValue={'+'}/>
                        <CalculatorKey class={style.keyOperator} handleClick={this.addToInput} value={'-'}
                                       displayValue={'-'}/>
                        <CalculatorKey class={style.keyOperator} handleClick={this.addToInput} value={'*'}
                                       displayValue={'x'}/>
                        <CalculatorKey class={style.keyOperator} handleClick={this.addToInput} value={'/'}
                                       displayValue={'÷'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'7'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'8'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'9'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'4'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'5'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'6'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'1'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'2'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'3'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'0'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'.'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'C'}/>
                        <CalculatorKey handleClick={this.addToInput} value={'SAVE'}/>
                        <CalculatorKey class={style.keyEqual} handleClick={this.evaluate} value={'='}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;