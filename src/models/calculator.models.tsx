export interface CalculatorState {
    calculator: {
        upperDisplay: string,
        display: string
        operator: string
    },
    saving: boolean
}

export interface CalculatorKeyProps {
    handleClick: (value: string) => void,
    value: string
    displayValue?: string
    class?: string,
}