import React from 'react';
import { Bot } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <Bot size={24} className="text-blue-500" />
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </div>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 overflow-hidden">
        {children}
      </main>
    </div>
  );
};