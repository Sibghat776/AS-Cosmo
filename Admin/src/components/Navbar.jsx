import React from "react";
import { Bell, Globe, Settings } from "lucide-react";

const Navbar = () => {
    return (
        <header className="h-16 w-full bg-white flex items-center justify-between px-4 sm:px-6 shadow-md sticky top-0 z-50">
            {/* Logo */}
            <div className="text-lg sm:text-xl font-bold text-indigo-600 tracking-wide cursor-pointer hover:text-indigo-700 transition-colors">
                Sibghat Admin
            </div>

            {/* Icons & Avatar */}
            <div className="flex items-center gap-3 sm:gap-5 text-gray-600">
                {/* Notifications */}
                <div className="relative cursor-pointer hover:text-indigo-500 transition-colors duration-200">
                    <Bell size={22} className="sm:w-6 sm:h-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-[11px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                        1
                    </span>
                </div>

                {/* Language */}
                <div className="relative cursor-pointer hover:text-indigo-500 transition-colors duration-200">
                    <Globe size={22} className="sm:w-6 sm:h-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-[11px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                        2
                    </span>
                </div>

                {/* Settings */}
                <div className="cursor-pointer hover:text-indigo-500 transition-colors duration-200">
                    <Settings size={22} className="sm:w-6 sm:h-6" />
                </div>

                {/* Avatar */}
                <img
                    src="https://placehold.co/128x128/E0E0E0/333333?text=SB"
                    alt="avatar"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover cursor-pointer transition-transform hover:scale-110 duration-200 shadow-sm"
                />
            </div>
        </header>
    );
};

export default Navbar;