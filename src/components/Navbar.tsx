import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";

const navItems = [
  { name: "All Books", path: "/books" },
  { name: "Add Book", path: "/create-book" },
  { name: "Borrow Summary", path: "/borrow-summary" },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md border-b">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Library 📚
      </Link>
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1 rounded-md text-sm font-medium",
                  isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
                )
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <ModeToggle></ModeToggle>
    </nav>
  );
};

export default Navbar;
