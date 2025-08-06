import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <div className="flex-1 lg:ml-0">
          <Header onMenuToggle={toggleSidebar} />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;