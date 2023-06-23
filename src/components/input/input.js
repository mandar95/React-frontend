import { TextInput, Text } from "./input.style"

const Input = ({
    label,
    name,
    ...otherProps
}) => {

    const onChangeHandler = (e) => {
    }
    const onBlurHandler = (e) => {
    }

    return (
        <>
            <Text>{label}</Text>
            <TextInput
                {...otherProps}
            />
        </>
    )
}

export default Input