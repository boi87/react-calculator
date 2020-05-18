export interface ICalculatorState {
    calculator: {
        headerDisplay: string,
        resultDisplay: string,
        n1: string | 0,
        n2: string | 0,
        operator: string
        result: string
        prevResult: string
    },
    showEqual: boolean
    saved: boolean
}

export interface IDisplayProps {
    headerDisplay: string
    resultDisplay: string
    saved?: boolean
}

export interface IKeyPadProps {
    onInputEvent: (input: { value: string; displayValue: string | undefined; }) => void,
    onEvaluateEvent: () => void
    onSaveEvent: () => void
    currentResult?: string,
}

export interface ICalculatorKeyProps {
    handleClick: (input: { value: string; displayValue: string | undefined; }) => void,
    value: string
    displayValue?: string
    class?: string,
    currentResult?: string
}
