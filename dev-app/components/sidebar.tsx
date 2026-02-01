/**
 * Sidebar navigation component for dev-app
 * Provides navigation to all component test pages
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface NavLink {
  href: string;
  label: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

const nav_sections: NavSection[] = [
  {
    title: "Multi-Field Components",
    links: [
      { href: "/multi-filter-dialog", label: "Multi Filter Dialog" },
      { href: "/multi-sort-dialog", label: "Multi Sort Dialog" },
    ],
  },
  {
    title: "Input Components",
    links: [
      { href: "/flex-radio", label: "Flex Radio" },
      { href: "/flex-input", label: "Flex Input" },
      { href: "/textbox", label: "Textbox" },
      { href: "/textarea", label: "Textarea" },
    ],
  },
  {
    title: "Rich Content",
    links: [
      { href: "/rte", label: "Rich Text Editor" },
      { href: "/command", label: "Command System" },
    ],
  },
  {
    title: "Dialogs",
    links: [{ href: "/dialog", label: "Dialog" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  const toggle_mobile_menu = () => {
    set_is_mobile_open(!is_mobile_open);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggle_mobile_menu}
        className="cls_mobile_menu_btn lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border border-border hover:bg-accent"
        aria-label="Toggle menu"
      >
        {is_mobile_open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {is_mobile_open && (
        <div
          className="cls_mobile_overlay lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggle_mobile_menu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          cls_sidebar
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-background border-r border-border
          overflow-y-auto z-40
          transition-transform duration-300 lg:translate-x-0
          ${is_mobile_open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="cls_sidebar_content p-6">
          {/* Logo/Title */}
          <Link
            href="/"
            className="cls_sidebar_title block mb-8 text-xl font-bold hover:text-primary transition-colors"
            onClick={() => set_is_mobile_open(false)}
          >
            hazo_ui
          </Link>

          {/* Navigation */}
          <nav className="cls_sidebar_nav space-y-6">
            {nav_sections.map((section) => (
              <div key={section.title} className="cls_nav_section">
                <h3 className="cls_section_title text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <ul className="cls_section_links space-y-1">
                  {section.links.map((link) => {
                    const is_active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => set_is_mobile_open(false)}
                          className={`
                            cls_nav_link block px-3 py-2 rounded-md text-sm
                            transition-colors
                            ${
                              is_active
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-foreground hover:bg-accent hover:text-accent-foreground"
                            }
                          `}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
