import React from "react";

import style from './calculator.module.sass';
import {CalculatorState} from "../../models/calculator.models";
import CalculatorKey from "../buttons/calculatorKey/calculatorKey";


class Calculator extends React.Component<any, CalculatorState> {

    readonly state: Readonly<CalculatorState> = {
        calculator: {
            upperDisplay: ' ',
            display: '0',
            n1: '',
            n2: '',
            operator: ''
        },
        saving: false
    };




    addToInput = (input: {value: string, displayValue: string | undefined}) => {

        if (!isNaN(+input.value) || input.value === '.') {
            if (this.state.calculator.operator === '') {
                this.setState(state => (
                        {
                            ...state,
                            calculator: {
                                ...state.calculator,
                                n1: this.state.calculator.n1 + input.value,
                            }
                        })
                    );
            } else {
                this.setState(state => (
                        {
                            ...state,
                            calculator: {
                                ...state.calculator,
                                n2: state.calculator.n2 + input.value,
                            }
                        })
                    )
            }
        } else {
            this.setState(state => (
                        {
                            ...state,
                            calculator: {
                                ...state.calculator,
                                operator: (input.displayValue || input.value),
                            }
                        })
                    );
        }

        this.updateUpperDisplay()
    };

    updateUpperDisplay = () => {
        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    upperDisplay: state.calculator.n1 + state.calculator.operator + state.calculator.n2
                }
            })
        )
    };

    gatherData = (dataString: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            try {
                let parsedData: {
                    numbers: number[],
                    operator: string[]
                } = {
                    numbers: [],
                    operator: []
                };
                // filter operators
                parsedData.operator = dataString.split('').filter(x => isNaN(+x));

                // filter numbers
                parsedData.numbers =
                    dataString
                        .replace(/[^0-9]/g, ' ')
                        .split(' ')
                        .map(x => parseInt(x));

                resolve(parsedData);
            } catch (err) {
                reject(err);
            }
        })
    }

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