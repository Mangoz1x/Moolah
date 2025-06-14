import PageTransition from '@/components/transitions/PageTransition';

export default function TransactionsPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        </div>
        
        {/* Content will go here */}
      </div>
    </PageTransition>
  );
}