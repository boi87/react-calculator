import React from "react";

import style from './calculator.module.sass';
import {ICalculatorState} from "../../models/calculator.models";
import KeyPad from "../keypad/keyPad";
import Display from "../display/display";


class Calculator extends React.Component<any, ICalculatorState> {

    readonly state: Readonly<ICalculatorState> = {
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
                        if (!isNaN(+input.value) || (input.value === '.' && !this.state.calculator.n1.includes('.'))) {
                            this.setState(state => ({
                                    ...state,
                                    calculator: {
                                        ...state.calculator,
                                        n1: this.state.calculator.n1 + input.value,
                                        n2: '',
                                        result: '',
                                        operator: '',
                                        prevResult: ''
                                    }
                                })
                            )
                        }
                    } else {
                        if (!isNaN(+input.value) || (input.value === '.' && !this.state.calculator.n2.includes('.'))) {
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
                    }
                } else {
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


    handleEvaluate = () => {
        if (this.state.calculator.operator !== '' && this.state.calculator.n1 !== '' && this.state.calculator.n2 !== '') {

            this.setState(state => ({...state, evaluating: true}));

            this.runCalculation().then(result => {
                this.setState(state => ({...state, calculator: {...state.calculator, result: result}}));
                this.updateDisplays();
            });

        }
    };

    handleSave = () => {
        // PHP part
        console.log('php');
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
                    <Display upperDisplay={this.state.calculator.upperDisplay}
                             mainDisplay={this.state.calculator.display}/>
                    <KeyPad
                        onInputEvent={this.handleInput}
                        onEvaluateEvent={this.handleEvaluate}
                        onSaveEvent={this.handleSave}/>
                </div>
            </div>
        )
    }
}

export default Calculator;