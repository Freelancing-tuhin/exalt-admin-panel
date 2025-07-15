export const SidebarItem = ({
  icon,
  label,
  active = false,
  isCollapsed = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
}) => {
  return (
    <div
      className={`flex items-center ${
        isCollapsed ? "justify-center" : "gap-3 px-3"
      } py-2 rounded-md text-md font-medium ${
        active
          ? "bg-gray-200 text-black"
          : "text-gray-700 hover:bg-gray-100 transition"
      }`}
    >
      <div className="text-lg">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </div>
  );
};
