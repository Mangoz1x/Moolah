'use client';

import { signIn } from 'next-auth/react';

export const GAuthButton = () => {
    return (
        <button
            type="button"
            className="py-3 px-6 mb-4 w-full cursor-pointer transition-all flex items-center justify-center gap-4 hover:bg-blue-600 bg-blue-500 text-white rounded-xl"
            onClick={() => signIn('google')}
        >
            <div className='p-0.5 rounded-full w-fit h-fit bg-white'>
                <svg className='size-6' style={{ flex: "none", lineHeight: 1 }} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <title>Google</title>
                    <path d="M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z" fill="#4285F4"></path>
                    <path d="M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z" fill="#34A853"></path>
                    <path d="M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z" fill="#FBBC05"></path>
                    <path d="M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z" fill="#EB4335"></path>
                </svg>
            </div>
            <span>Sign in with Google</span>
        </button>
    )
}