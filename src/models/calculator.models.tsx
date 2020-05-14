export interface CalculatorState {
    calculator: {
        upperDisplay: string,
        display: string
        operator: string
    },
    saving: boolean
}

export interface CalculatorKeyProps {
    handleClick: (input: { value: string; displayValue: string | undefined; }) => void,
    value: string
    displayValue?: string
    class?: string,
}