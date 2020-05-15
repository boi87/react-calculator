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
        saving: false,
        results: []
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

    getBrowser = (): Promise<string> => {
        let currentBrowser = 'Not known';

        if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
            currentBrowser = 'Google Chrome';
        } else if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
            currentBrowser = 'Mozilla Firefox';
        } else if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
            currentBrowser = 'Internet Exployer';
        } else if (window.navigator.userAgent.indexOf('Edge') !== -1) {
            currentBrowser = 'Edge';
        } else if (window.navigator.userAgent.indexOf('Safari') !== -1) {
            currentBrowser = 'Safari';
        } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
            currentBrowser = 'Opera';
        } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
            currentBrowser = 'YaBrowser';
        } else {
            console.log('Others');
        }

        return new Promise(resolve => resolve(currentBrowser));
    };

    getTime = (): Promise<string> => new Promise(resolve => resolve(new Date().toLocaleString()));

    handleSave = () => {
        // PHP part
        // this.getIpAddress().then(ip => console.log(ip));

        Promise.all([this.getIpAddress(), this.getBrowser(), this.getTime()])
            .then(promises => {
            console.log(promises);

        });

        console.log('appVersion', window.navigator.userAgent);

        this.setState(state => {
            return {
                ...state,
                results: [...state.results, this.state.calculator.result]
            }
        });

        console.log('this.state', this.state.results);
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