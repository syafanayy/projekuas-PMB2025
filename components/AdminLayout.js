"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();

  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Products", href: "dashboard/products", icon: "📦" },
    { name: "Profile", href: "/contact", icon: "🏷️" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-red-100 hover:text-white transition-colors">
                ← Back to Store
              </Link>
              <div className="flex items-center space-x-2 bg-red-700 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {adminNavigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === item.href ? "bg-red-50 text-red-700 border-l-4 border-red-700" : "text-gray-700 hover:bg-gray-50"}`}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
