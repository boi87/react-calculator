import React from "react";

import style from './calculator.module.sass';
import {CalculatorState} from "../../models/calculator.models";

class Calculator extends React.Component<any, CalculatorState> {

    readonly state: Readonly<CalculatorState> = {
        calculator: {
            upperDisplay: 'ee',
            display: '',
            operator: ''
        },
        saving: false
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
                        <button className={style.keyOperator} data-action="add">+</button>
                        <button className={style.keyOperator} data-action="subtract">-</button>
                        <button className={style.keyOperator} data-action="multiply">x</button>
                        <button className={style.keyOperator} data-action="divide">÷</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>0</button>
                        <button data-action="decimal">.</button>
                        <button data-action="clear">AC</button>
                        <button data-action="save">SAVE</button>
                        <button className={style.keyEqual} data-action="calculate">=</button>
                    </div>
                </div>
            </div>


        )
    }
}

export default Calculator;