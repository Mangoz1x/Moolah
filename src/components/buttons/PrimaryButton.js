export const PrimaryButton = ({
    children,
    className = '',
    onClick = () => { },
    type = 'button'
}) => {
    return <button
        type={type}
        className="py-3 px-6 mb-4 w-full cursor-pointer transition-all flex items-center justify-center gap-4 hover:bg-blue-600 bg-blue-500 text-white rounded-xl"
        onClick={onClick}
    >
        {children}
    </button>
} 