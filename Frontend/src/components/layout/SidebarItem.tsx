import React from 'react';

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
  return (
    <li>
      <button
        className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        onClick={onClick}
      >
        {icon}
        <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
      </button>
    </li>
  );
};

export default SidebarItem;
