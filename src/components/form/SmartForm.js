'use client';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

export function SmartForm({ className, children, onSubmit, ...props }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        onSubmit(data);
    };

    return (
        <form
            className={twMerge('space-y-4', className)}
            onSubmit={handleSubmit}
            {...props}
        >
            {children}
        </form>
    );
}

SmartForm.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
