import React, { useState, useEffect } from 'react';
import './SidebarMenu.css';

interface MenuItem {
  label: string;
  children?: MenuItem[];
}

export interface SidebarMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

const SubMenu: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <li>
      <button
        type="button"
        onClick={() => item.children && toggleSubMenu()}
        className="menu-item"
        aria-haspopup={!!item.children}
        aria-expanded={item.children ? isSubMenuOpen : undefined}
      >
        {item.label}
        {item.children && <span className={`arrow ${isSubMenuOpen ? 'open' : ''}`}>&#9662;</span>}
      </button>
      {item.children && (
        <div className={`submenu-container ${isSubMenuOpen ? 'open' : ''}`}>
          <ul className="submenu">
            {item.children.map((child, index) => (
              <SubMenu key={index} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        role="button"
        tabIndex={-1}
      />
      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <ul>
          {items.map((item, index) => (
            <SubMenu key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
