import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] text-slate-800 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {children || <Outlet />}
            </main>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'white',
                        color: '#191c1d',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
                        borderRadius: '16px',
                        fontFamily: "'Inter', sans-serif",
                        padding: '16px 20px',
                    },
                    className: 'text-[14px] font-semibold tracking-wide',
                }}
            />
        </div>
    );
}
