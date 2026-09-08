import { Folder, ListChecks, type LucideIcon, Package } from "lucide-react";
import { NavLink } from "react-router";

export interface SidebarLink {
  label: string;
  path: string;
  icon: LucideIcon;
}

const routes: SidebarLink[] = [
  { label: "Categories", path: "/categories", icon: Folder },
  { label: "Attributes", path: "/attributes", icon: ListChecks },
  { label: "Items", path: "/items", icon: Package },
];

export function Sidebar() {
  return (
    <div className="h-full w-64 overflow-y-auto bg-gray-50 border-r border-gray-400 p-4">
      {routes.map((link: SidebarLink) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className="flex gap-2 items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Icon />
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
