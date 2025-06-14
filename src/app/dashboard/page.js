'use client';

import { useSession } from "next-auth/react";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsCard from "@/components/dashboard/StatsCard";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            {session?.user && <WelcomeCard user={session.user} />}
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Balance"
                    value="$12,345"
                    icon="💰"
                    trend="up"
                    trendValue="+12%"
                    color="emerald"
                    delay={0.2}
                />
                <StatsCard
                    title="Monthly Income"
                    value="$4,200"
                    icon="📈"
                    trend="up"
                    trendValue="+8%"
                    color="blue"
                    delay={0.3}
                />
                <StatsCard
                    title="Monthly Expenses"
                    value="$2,150"
                    icon="💸"
                    trend="down"
                    trendValue="-5%"
                    color="purple"
                    delay={0.4}
                />
                <StatsCard
                    title="Savings Goal"
                    value="68%"
                    icon="🎯"
                    trend="up"
                    trendValue="+15%"
                    color="orange"
                    delay={0.5}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card delay={0.6}>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 text-sm">🍕</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Lunch</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">-$12.50</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm">💼</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Salary</p>
                                        <p className="text-xs text-gray-500">Yesterday</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-emerald-600">+$4,200</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card delay={0.7}>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                                <span className="text-2xl mb-2">➕</span>
                                <span className="text-sm font-medium text-gray-700">Add Transaction</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <span className="text-2xl mb-2">📊</span>
                                <span className="text-sm font-medium text-gray-700">View Reports</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                <span className="text-2xl mb-2">🎯</span>
                                <span className="text-sm font-medium text-gray-700">Set Goals</span>
                            </button>
                            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                <span className="text-2xl mb-2">⚙️</span>
                                <span className="text-sm font-medium text-gray-700">Settings</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}