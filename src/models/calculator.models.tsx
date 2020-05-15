export interface ICalculatorState {
    calculator: {
        upperDisplay: string,
        display: string,
        n1: string,
        n2: string,
        operator: string
        result: string
        prevResult: string
    },
    evaluating: boolean
    saving: boolean
    results: string[]
}

export interface IDisplayProps {
    upperDisplay: string
    mainDisplay: string
}

export interface IKeyPadProps {
    onInputEvent: (input: { value: string; displayValue: string | undefined; }) => void,
    onEvaluateEvent: () => void
    onSaveEvent: () => void
}

export interface ICalculatorKeyProps {
    handleClick: (input: { value: string; displayValue: string | undefined; }) => void,
    value: string
    displayValue?: string
    class?: string,
}
