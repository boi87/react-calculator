export interface CalculatorState {
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
}

export interface CalculatorKeyProps {
    handleClick: (input: { value: string; displayValue: string | undefined; }) => void,
    value: string
    displayValue?: string
    class?: string,
}