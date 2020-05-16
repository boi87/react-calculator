export interface ICalculatorState {
    calculator: {
        upperDisplay: string,
        mainDisplay: string,
        n1: string,
        n2: string,
        operator: string
        result: string
        prevResult: string
    },
    evaluating: boolean
    saved: boolean
}

export interface IDisplayProps {
    upperDisplay: string
    mainDisplay: string
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
