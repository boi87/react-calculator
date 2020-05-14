import React from "react";

import style from './calculator.module.sass';
import {CalculatorState} from "../../models/calculator.models";
import CalculatorKey from "../calculatorKey/calculatorKey";


class Calculator extends React.Component<any, CalculatorState> {

    readonly state: Readonly<CalculatorState> = {
        calculator: {
            n1: '',
            n2: '',
            operator: '',
            result: '',
            prevResult: '',
            upperDisplay: ' ',
            display: '0',
        },
        evaluating: false,
        saving: false
    };


    handleInput = (input: { value: string, displayValue: string | undefined }) => {

        if (input.value === 'C') {
            return this.handleCancel();
        }

        this.setState((state) => {
                if (this.state.evaluating) {
                    return {
                        ...state,
                        evaluating: false,
                        calculator: {
                            ...state.calculator,
                            operator: '',
                            result: '',
                            n1: ''
                        }
                    }
                }
                return {
                    ...state
                }
            }, () => {
                if (!isNaN(+input.value) || input.value === '.') {
                    if (this.state.calculator.operator === '') {
                        console.log('setting number 1');
                        this.setState(state => (
                            {
                                ...state,
                                calculator: {
                                    ...state.calculator,
                                    n1: this.state.calculator.n1 + input.value,
                                    n2: '',
                                    result: '',
                                    operator: '',
                                    prevResult: ''
                                },
                            })
                        );
                    } else {
                        console.log('setting number 2');
                        this.setState(state => (
                            {
                                ...state,
                                calculator: {
                                    ...state.calculator,
                                    n2: state.calculator.n2 + input.value,
                                    result: this.state.calculator.prevResult ? this.state.calculator.prevResult : '',
                                },
                            })
                        )
                    }
                } else {
                    console.log('setting operator');
                    this.setState(state => (
                        {
                            ...state,
                            calculator: {
                                ...state.calculator,
                                n1: this.state.calculator.prevResult ? this.state.calculator.prevResult : this.state.calculator.n1,
                                n2: this.state.calculator.prevResult ? '' : this.state.calculator.n2,
                                operator: (input.displayValue || input.value),
                                result: this.state.calculator.prevResult ? this.state.calculator.prevResult : ''
                            },
                            evaluating: false
                        })
                    );
                }
                this.updateDisplays();
            }
        );

    };


    evaluate = () => {
        if (this.state.calculator.operator !== '' && this.state.calculator.n1 !== '' && this.state.calculator.n2 !== '') {

            this.setState(state => ({...state, evaluating: true}));

            this.runCalculation().then(result => {
                this.setState(state => ({...state, calculator: {...state.calculator, result: result}}));
                this.updateDisplays();
            });

        }
    };

    updateDisplays = () => {

        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    upperDisplay: state.calculator.n1 + state.calculator.operator + state.calculator.n2 + (this.state.evaluating ? '=' : ''),
                    prevResult: this.state.calculator.result ? this.state.calculator.result.toString() : '',
                    display: this.state.calculator.result !== '' ? this.state.calculator.result.toString() : state.calculator.prevResult ? state.calculator.prevResult : '0'
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
                    n2: '',
                    result: '',
                    prevResult: ''
                }
            })
        )
    };

    runCalculation = (): Promise<any> => {
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