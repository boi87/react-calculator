import React from "react";
import axios from 'axios';

import KeyPad from "../keypad/keyPad";
import Display from "../display/display";

import {ICalculatorState} from "../../models/calculator.models";

import './calculator.sass';

class Calculator extends React.Component<any, ICalculatorState> {

    readonly state: Readonly<ICalculatorState> = {
        calculator: {
            n1: '',
            n2: '',
            operator: '',
            result: '',
            prevResult: '',
            headerDisplay: ' ',
            resultDisplay: '0',
        },
        showEqual: false,
        saved: false
    };

    setNumberOne = (input: { value: string, displayValue: string | undefined }) => {
        if (!isNaN(+input.value) || (input.value === '.' && !this.state.calculator.n1.toString().includes('.'))) {
            return this.setState(state => ({
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
    };

    setNumberTwo = (input: { value: string, displayValue: string | undefined }) => {
        if (!isNaN(+input.value) || (input.value === '.' && !this.state.calculator.n2.toString().includes('.'))) {
            return this.setState(state => (
                {
                    ...state,
                    calculator: {
                        ...state.calculator,
                        n2: state.calculator.n2 + input.value,
                    },
                })
            )
        }
    };

    setOperator = (input: { value: string, displayValue: string | undefined }) => {
        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    n1: this.state.calculator.prevResult ? this.state.calculator.prevResult : this.state.calculator.n1,
                    operator: (input.displayValue || input.value),
                    result: ''
                },
                showEqual: false
            })
        );
    };

    handleInput = (input: { value: string, displayValue: string | undefined }) => {

        if (input.value === 'AC') {
            return this.handleCancel();
        }

        this.setState((state) => {
                if (this.state.showEqual) {
                    return {
                        ...state,
                        showEqual: false,
                        calculator: {
                            ...state.calculator,
                            operator: '',
                            result: '',
                            n1: '',
                            n2: ''
                        }
                    }
                }
                return {
                    ...state
                }
            }, () => {
                if (!isNaN(+input.value) || input.value === '.') {
                    if (this.state.calculator.operator === '') {
                        this.setNumberOne(input);
                    } else {
                        this.setNumberTwo(input);
                    }
                } else {
                    this.setOperator(input);
                }
                this.updateDisplays();
            },
        );

    };

    handleEvaluate = () => {
        if (this.state.calculator.operator !== '') {
            this.setState(state => ({...state, showEqual: true}));

            this.runCalculation().then(result => {
                this.setState(state => ({
                    ...state,
                    calculator: {...state.calculator, result: result, prevResult: result}
                }));
                this.updateDisplays();
            });

        }
    };

    handleCancel = () => {
        this.setState(() => (
            {
                showEqual: false,
                calculator: {
                    n1: '',
                    n2: '',
                    operator: '',
                    result: '',
                    prevResult: '',
                    headerDisplay: ' ',
                    resultDisplay: '0',
                }
            })
        )
    };

    runCalculation = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            let result = 0;

            const numberOne = +this.state.calculator.n1 || 0;
            const numberTwo = +this.state.calculator.n2 || 0;

            try {
                switch (this.state.calculator.operator) {
                    case "+":
                        result = numberOne + numberTwo;
                        break;
                    case "-":
                        result = numberOne - numberTwo;
                        break;
                    case "x":
                        result = numberOne * numberTwo;
                        break;
                    case "÷":
                        result = numberOne / numberTwo;
                        break;
                }
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    };

    updateDisplays = () => {
        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    headerDisplay: state.calculator.n1 + state.calculator.operator + state.calculator.n2 + (this.state.showEqual ? '=' : ''),
                    resultDisplay: this.state.calculator.result.toString() || state.calculator.prevResult.toString() || '0'
                }
            })
        )
    };

    getIpAddress = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                fetch('https://api.ipify.org?format=jsonp?callback=?', {
                    method: 'GET',
                    headers: {},
                }).then(res => {
                    resolve(res.text());
                })
            } catch (err) {
                reject(err);
            }
        })
    };

    handleSave = () => {
        this.getIpAddress().then(ip => {
                const dataToExport = new URLSearchParams();
                dataToExport.append('result', this.state.calculator.result);
                dataToExport.append('ipFromJs', ip);
                axios.post('http://localhost/calculations.php', dataToExport)
                    .then(res => {
                        console.log(res);
                        if (res.statusText === 'OK') {
                            this.setState(state => ({...state, saved: true}));
                            setTimeout(() => this.setState(state => ({...state, saved: false})), 500)
                        }
                    })
            }
        )
    };


    render() {
        return (
            <div>
                <div className={'calculator'}>
                    <Display headerDisplay={this.state.calculator.headerDisplay}
                             resultDisplay={this.state.calculator.resultDisplay}
                             saved={this.state.saved}/>
                    <KeyPad
                        onInputEvent={this.handleInput}
                        onEvaluateEvent={this.handleEvaluate}
                        onSaveEvent={this.handleSave}
                        currentResult={this.state.calculator.result}
                    />
                </div>
            </div>
        )
    }
}

export default Calculator;