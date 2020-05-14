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


    handleInput = (input: { value: string, displayValue: string | undefined }) => {
        console.log(input.value);
        if (input.value === 'C') {
            this.handleCancel();
        } else if (!isNaN(+input.value) || input.value === '.') {
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

        this.updateDisplays();
    };


    evaluate = () => {
        if (this.state.calculator.operator !== '' && this.state.calculator.n1 !== '' && this.state.calculator.n2 !== '') {
            this.runCalculation().then(result => {
                console.log(result);
            this.updateDisplays(true, result);
            });

        }
    };

    updateDisplays = (evaluating?: boolean, result?: number) => {

        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    upperDisplay: state.calculator.n1 + state.calculator.operator + state.calculator.n2 + (evaluating ? '=' : ''),
                    display: result ? result.toString() : '0'
                }
            })
        )
    };

    handleCancel = () => {
        this.setState(state => (
            {
                ...state,
                calculator: {
                    upperDisplay: '',
                    display: '0',
                    operator: '',
                    n1: '',
                    n2: ''
                }
            })
        )
    };

    runCalculation = (): Promise<any> => {
        console.log('runCalculation');

        return new Promise((resolve, reject) => {
            let result = 0;
            try {
                switch (this.state.calculator.operator) {
                    case "+":
                        result = +this.state.calculator.n1 + +this.state.calculator.n2;
                        break;
                    case "-":
                        result = +this.state.calculator.n1 - +this.state.calculator.n2;
                        break;
                    case "x":
                        result = +this.state.calculator.n1 * +this.state.calculator.n2;
                        break;
                    case "÷":
                        result = +this.state.calculator.n1 / +this.state.calculator.n2;
                        break;
                }
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
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

                        <CalculatorKey class={style.keyOperator} handleClick={this.handleInput} value={'+'}
                                       displayValue={'+'}/>
                        <CalculatorKey class={style.keyOperator} handleClick={this.handleInput} value={'-'}
                                       displayValue={'-'}/>
                        <CalculatorKey class={style.keyOperator} handleClick={this.handleInput} value={'*'}
                                       displayValue={'x'}/>
                        <CalculatorKey class={style.keyOperator} handleClick={this.handleInput} value={'/'}
                                       displayValue={'÷'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'7'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'8'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'9'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'4'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'5'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'6'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'1'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'2'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'3'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'0'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'.'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'C'}/>
                        <CalculatorKey handleClick={this.handleInput} value={'SAVE'}/>
                        <CalculatorKey class={style.keyEqual} handleClick={this.evaluate} value={'='}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;