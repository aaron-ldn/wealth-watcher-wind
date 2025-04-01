
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Home, PieChart, DollarSign, Settings } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg md:left-0 md:top-0 md:bottom-auto md:w-16 md:h-screen md:flex md:flex-col z-10">
      <div className="hidden md:flex md:justify-center md:py-6">
        <Logo />
      </div>
      <div className="flex justify-around md:flex-col md:items-center md:justify-start md:mt-10 md:gap-8">
        <NavItem to="/" icon={<Home size={24} />} label="Home" />
        <NavItem to="/transactions" icon={<DollarSign size={24} />} label="Transactions" />
        <NavItem to="/budget" icon={<PieChart size={24} />} label="Budget" />
        <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" />
      </div>
    </nav>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center p-3 text-gray-600 hover:text-primary transition-colors"
    >
      <div className="md:p-2 md:rounded-lg md:hover:bg-primary/10">
        {icon}
      </div>
      <span className="text-xs mt-1 md:hidden">{label}</span>
    </Link>
  );
};

export default NavBar;
