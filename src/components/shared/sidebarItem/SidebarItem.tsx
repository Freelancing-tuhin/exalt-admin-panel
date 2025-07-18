import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  route: string;
}

export const SidebarItem = ({
  icon,
  label,
  isCollapsed = false,
  route,
}: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if this item is currently active
  const isActive = location.pathname === route;

  const handleClick = () => {
    if (route && route !== location.pathname) {
      navigate(route);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer flex items-center ${
        isCollapsed ? "justify-center" : "gap-3 px-3"
      } py-2 rounded-md text-md font-medium ${
        isActive
          ? "bg-gray-200 text-black"
          : "text-gray-700 hover:bg-gray-100 transition"
      }`}
    >
      <div className="text-lg">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </div>
  );
};
