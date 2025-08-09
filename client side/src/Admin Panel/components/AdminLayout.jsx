import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
    Home,
    BarChart2,
    TrendingUp,
    Users,
    UserPlus,
    Package,
    DollarSign,
    Mail,
    MessageSquare,
    Bell,
    Briefcase,
    PieChart,
    FileText,
    X,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        links: [
            { to: "/", icon: Home, label: "Home" },
            { to: "/analytics", icon: BarChart2, label: "Analytics" },
            { to: "/sales", icon: TrendingUp, label: "Sales" },
        ],
    },
    {
        title: "Quick Menu",
        links: [
            { to: "/users", icon: Users, label: "Users" },
            { to: "/new-user", icon: UserPlus, label: "Create User" },
            { to: "/products", icon: Package, label: "Products" },
            { to: "/transactions", icon: DollarSign, label: "Transactions" },
            { to: "/reports", icon: FileText, label: "Reports" },
        ],
    },
    {
        title: "Notifications",
        links: [
            { to: "/mail", icon: Mail, label: "Mail" },
            { to: "/feedback", icon: MessageSquare, label: "Feedback" },
            { to: "/messages", icon: Bell, label: "Messages" },
        ],
    },
    {
        title: "Staff",
        links: [
            { to: "/manage", icon: Briefcase, label: "Manage" },
            { to: "/analytics-staff", icon: PieChart, label: "Analytics" },
            { to: "/reports-staff", icon: FileText, label: "Reports" },
        ],
    },
];

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <div
                className={`fixed lg:static top-0 left-0 h-full lg:h-screen w-64 bg-white shadow-xl border-r flex flex-col transition-transform duration-300 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Mobile Close Button */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b">
                    <span className="font-bold text-indigo-600">Menu</span>
                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-md hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Brand for Desktop */}
                <div className="hidden lg:flex items-center justify-center h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow-md">
                    Admin Panel
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {menuItems.map((section) => (
                        <div key={section.title} className="mb-5">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-1">
                                {section.links.map(({ to, icon: Icon, label }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100 hover:text-indigo-700 transition-all duration-200 group"
                                    >
                                        <Icon
                                            size={18}
                                            className="text-gray-500 group-hover:text-indigo-600 transition-colors"
                                        />
                                        <span className="text-sm font-medium">{label}</span>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Navbar (Mobile Only) */}
                <div className="lg:hidden flex items-center justify-between p-3 bg-white shadow-md sticky top-0 z-50">
                    <h1 className="text-base font-bold text-indigo-600">Admin Panel</h1>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                    >
                        ☰
                    </button>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
