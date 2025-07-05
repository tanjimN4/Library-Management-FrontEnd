import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "All Books", path: "/books" },
  { name: "Add Book", path: "/create-book" },
  { name: "Borrow Summary", path: "/borrow-summary" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 shadow-md border-b bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Library 📚
        </Link>

        {/* Desktop/Tablet Navigation */}
        <ul className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-1 rounded-md text-sm font-medium",
                    isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 dark:text-gray-200"
                  )
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ModeToggle + Hamburger (Mobile only) */}
        <div className="flex items-center md:gap-2 gap-4">
          <ModeToggle />
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (below nav) */}
      {menuOpen && (
        <ul className="md:hidden mt-3 space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setMenuOpen(false)} // close on click
                className={({ isActive }) =>
                  cn(
                    "block w-full px-3 py-2 rounded-md text-sm font-medium",
                    isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 dark:text-gray-200"
                  )
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
