import React from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    BarChart,
    TrendingUp,
    User,
    ShoppingBag,
    DollarSign,
    Mail,
    List,
    MessageCircle,
    Briefcase,
    Flag,
    UserPlus
} from "lucide-react";

/**
 * A responsive sidebar component for an admin dashboard.
 * Contains navigation links grouped into categories.
 */
const Sidebar = () => {
    return (
        <div className="w-64 h-screen overflow-y-auto sticky top-0 bg-white shadow-lg border-r border-gray-200 p-4">
            <div className="text-sm">
                {/* Menu Group: Dashboard */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Dashboard</h3>
                    <ul className="space-y-1">
                        <Link to="/" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <LayoutDashboard size={18} />
                            Home
                        </Link>
                        <Link to="/analytics" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <BarChart size={18} />
                            Analytics
                        </Link>
                        <Link to="/sales" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <TrendingUp size={18} />
                            Sales
                        </Link>
                    </ul>
                </div>

                {/* Menu Group: Quick Menu */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Menu</h3>
                    <ul className="space-y-1">
                        <Link to="/users" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <User size={18} />
                            Users
                        </Link>
                        <Link to="/new-user" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <UserPlus size={18} />
                            Create User
                        </Link>
                        <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <ShoppingBag size={18} />
                            Products
                        </Link>
                        <Link to="/transactions" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <DollarSign size={18} />
                            Transactions
                        </Link>
                        <Link to="/reports" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <BarChart size={18} />
                            Reports
                        </Link>
                    </ul>
                </div>

                {/* Menu Group: Notifications */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Notifications</h3>
                    <ul className="space-y-1">
                        <Link to="/mail" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <Mail size={18} />
                            Mail
                        </Link>
                        <Link to="/feedback" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <List size={18} />
                            Feedback
                        </Link>
                        <Link to="/messages" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <MessageCircle size={18} />
                            Messages
                        </Link>
                    </ul>
                </div>

                {/* Menu Group: Staff */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Staff</h3>
                    <ul className="space-y-1">
                        <Link to="/manage" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <Briefcase size={18} />
                            Manage
                        </Link>
                        <Link to="/analytics-staff" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <BarChart size={18} />
                            Analytics
                        </Link>
                        <Link to="/reports-staff" className="flex items-center gap-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-200">
                            <Flag size={18} />
                            Reports
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;