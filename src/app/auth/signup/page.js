'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAuthButton } from '@/components/buttons/GAuthButton';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { SmartForm } from '@/components/form/SmartForm';
import { Input } from '@/components/inputs/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                // Auto-login after sign up
                const signInResponse = await signIn('credentials', {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                });

                if (signInResponse?.error) {
                    setError('Account created but sign-in failed. Please try logging in manually.');
                    setIsLoading(false);
                    return;
                }

                // Small delay for smooth UX before navigation
                await new Promise(resolve => setTimeout(resolve, 300));
                router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`);
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Sign-up failed. Please try again.');
                setIsLoading(false);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
            <motion.div
                className="w-full max-w-sm mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                    staggerChildren: 0.1
                }}
            >
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                >
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Join Moolah
                    </h1>
                    <p className="text-slate-600 text-sm">
                        Start tracking your finances today
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.2 }
                    }}
                >
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                layout
                            >
                                <p className="text-red-600 text-sm font-medium">
                                    {error}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <SmartForm onSubmit={handleSubmit} className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                        >
                            <GAuthButton />
                        </motion.div>

                        <motion.div
                            className="flex items-center my-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                        >
                            <hr className="flex-grow border-slate-200" />
                            <span className="px-4 text-slate-400 text-sm font-medium">
                                OR
                            </span>
                            <hr className="flex-grow border-slate-200" />
                        </motion.div>

                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                        >
                            <Input
                                name="name"
                                type="text"
                                placeholder="Full name"
                                required={true}
                                className="transition-all duration-200 focus:scale-[1.02]"
                            />

                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                required={true}
                                className="transition-all duration-200 focus:scale-[1.02]"
                            />

                            <Input
                                name="password"
                                type="password"
                                placeholder="Create password"
                                required={true}
                                className="transition-all duration-200 focus:scale-[1.02]"
                            />
                        </motion.div>

                        <motion.div
                            className="pt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                        >
                            <PrimaryButton
                                disabled={isLoading}
                                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                            >
                                <motion.span
                                    initial={false}
                                    animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Create Account
                                </motion.span>
                                <AnimatePresence>
                                    {isLoading && (
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </PrimaryButton>
                        </motion.div>
                    </SmartForm>

                    <motion.div
                        className="text-center mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
                    >
                        <p className="text-xs text-slate-500 leading-relaxed">
                            By signing up, you agree to our{' '}
                            <a
                                href="/terms"
                                className="text-slate-700 hover:text-slate-900 transition-colors duration-200"
                            >
                                Terms of Service
                            </a>
                            {' '}and{' '}
                            <a
                                href="/privacy"
                                className="text-slate-700 hover:text-slate-900 transition-colors duration-200"
                            >
                                Privacy Policy
                            </a>
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="text-center mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
                >
                    <p className="text-sm text-slate-600">
                        Already have an account?{' '}
                        <a
                            href="/auth/signin"
                            className="font-semibold text-slate-900 hover:text-slate-700 transition-colors duration-200"
                        >
                            Sign in
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}