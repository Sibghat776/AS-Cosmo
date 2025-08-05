import React from "react";
import { Bell, Globe, Settings } from "lucide-react";

/**
 * A responsive Navbar component for an admin dashboard.
 * Features include a logo, notification, language, settings icons, and a user avatar.
 */
const Navbar = () => {
    return (
        <div className="h-16 w-full bg-white flex items-center justify-between px-4 md:px-6 shadow-md sticky top-0 z-50">
            {/* Left: Logo */}
            <div className="text-xl font-bold text-indigo-600">Sibghat Admin</div>

            {/* Right: Icons and Avatar */}
            <div className="flex items-center gap-4 text-gray-600">
                <div className="relative cursor-pointer">
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                        1
                    </span>
                </div>

                <div className="relative cursor-pointer">
                    <Globe size={24} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                        2
                    </span>
                </div>

                <div className="cursor-pointer">
                    <Settings size={24} />
                </div>

                {/* Avatar */}
                <img
                    src="https://placehold.co/128x128/E0E0E0/333333?text=SB"
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer transition-transform hover:scale-110 duration-200"
                />
            </div>
        </div>
    );
};

export default Navbar;