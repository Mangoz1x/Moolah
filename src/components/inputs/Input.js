import { twMerge } from 'tailwind-merge';

export function Input({
    className = '',
    value,
    defaultValue,
    type = 'text',
    min,
    max,
    onChange,
    required = false,
    placeholder = '',
    ...props
}) {
    // Build up props object
    const inputProps = {
        type,
        required,
        placeholder,
        className: twMerge(
            'w-full py-3 px-6 text-black rounded-xl transition-all bg-white border border-gray-500',
            className
        ),
        onChange,
        ...props,
    };

    // Only include value/defaultValue when explicitly passed
    if (value !== undefined) inputProps.value = value;
    if (defaultValue !== undefined) inputProps.defaultValue = defaultValue;

    // Only include numeric bounds for number inputs
    if (type === 'number') {
        if (min !== undefined && min !== null) inputProps.min = min;
        if (max !== undefined && max !== null) inputProps.max = max;
    }

    return <input {...inputProps} />;
}
