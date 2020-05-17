import React from "react";
import axios from 'axios';

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
            mainDisplay: '0',
        },
        evaluating: false,
        saved: false
    };

    setNumberOne = (input: { value: string, displayValue: string | undefined }) => {
        if (!isNaN(+input.value) || (input.value === '.' && !this.state.calculator.n1.includes('.'))) {
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
        if (!isNaN(+input.value) || (input.value === '.' && !this.state.calculator.n2.includes('.'))) {
            return this.setState(state => (
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
    };

    setOperator = (input: { value: string, displayValue: string | undefined }) => {
        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    n1: this.state.calculator.prevResult ? this.state.calculator.prevResult : this.state.calculator.n1,
                    n2: this.state.calculator.prevResult ? '' : this.state.calculator.n2,
                    operator: (input.displayValue || input.value),
                    result: ''
                },
                evaluating: false
            })
        );
    };

    handleInput = (input: { value: string, displayValue: string | undefined }) => {

        if (input.value === 'AC') {
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
                            n1: '',
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
        if (this.state.calculator.operator !== '' && this.state.calculator.n1 !== '' && this.state.calculator.n2 !== '') {
            this.setState(state => ({...state, evaluating: true}));

            this.runCalculation().then(result => {
                this.setState(state => ({
                    ...state,
                    calculator: {...state.calculator, result: result, prevResult: result}
                }));
                this.updateDisplays();
            });

        }
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
                        if (res.statusText === 'OK') {
                            this.setState(state => ({...state, saved: true}));
                            setTimeout(() => this.setState(state => ({...state, saved: false})), 500)
                        }
                    })
            }
        )
    };

    updateDisplays = () => {
        this.setState(state => (
            {
                ...state,
                calculator: {
                    ...state.calculator,
                    upperDisplay: state.calculator.n1 + state.calculator.operator + state.calculator.n2 + (this.state.evaluating ? '=' : ''),
                    mainDisplay: this.state.calculator.result.toString() || state.calculator.prevResult.toString() || '0'
                }
            })
        )
    };

    handleCancel = () => {
        this.setState(() => (
            {
                evaluating: false,
                calculator: {
                    n1: '',
                    n2: '',
                    operator: '',
                    result: '',
                    prevResult: '',
                    upperDisplay: ' ',
                    mainDisplay: '0',
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
                             mainDisplay={this.state.calculator.mainDisplay}
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