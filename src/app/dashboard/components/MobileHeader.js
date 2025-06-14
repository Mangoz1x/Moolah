export function MobileHeader({ onMenuClick }) {
    return (
        <div className="lg:hidden sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm">
            <button
                onClick={onMenuClick}
                className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-200"
            >
                ☰
            </button>
            <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                💰 Moolah
            </div>
        </div>
    );
}