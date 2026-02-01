// Home page for hazo_ui dev app
// Welcome and overview page for component library testing
"use client";

import Link from "next/link";
import { FiFilter, FiList, FiRadio, FiEdit3, FiType, FiMessageSquare, FiCommand, FiSquare } from "react-icons/fi";

interface ComponentCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
}

const components: ComponentCard[] = [
  {
    title: "Multi Filter Dialog",
    description: "Advanced multi-field filtering with text, number, date, boolean, and combobox support",
    href: "/multi-filter-dialog",
    icon: <FiFilter size={24} />,
    category: "Multi-Field Components",
  },
  {
    title: "Multi Sort Dialog",
    description: "Drag-and-drop multi-field sorting with ascending/descending controls",
    href: "/multi-sort-dialog",
    icon: <FiList size={24} />,
    category: "Multi-Field Components",
  },
  {
    title: "Flex Radio",
    description: "Flexible radio and icon selection with horizontal/vertical layouts",
    href: "/flex-radio",
    icon: <FiRadio size={24} />,
    category: "Input Components",
  },
  {
    title: "Flex Input",
    description: "Enhanced input with validation, constraints, and format guidance",
    href: "/flex-input",
    icon: <FiEdit3 size={24} />,
    category: "Input Components",
  },
  {
    title: "Textbox",
    description: "Single-line input with slash commands and mentions",
    href: "/textbox",
    icon: <FiType size={24} />,
    category: "Input Components",
  },
  {
    title: "Textarea",
    description: "Multi-line input with command and mention support",
    href: "/textarea",
    icon: <FiMessageSquare size={24} />,
    category: "Input Components",
  },
  {
    title: "Rich Text Editor",
    description: "Full-featured RTE with variables, formatting, and attachments",
    href: "/rte",
    icon: <FiEdit3 size={24} />,
    category: "Rich Content",
  },
  {
    title: "Command System",
    description: "Command pills with @/# prefix support and variants",
    href: "/command",
    icon: <FiCommand size={24} />,
    category: "Rich Content",
  },
  {
    title: "Dialog",
    description: "Modal dialog component for confirmations and forms",
    href: "/dialog",
    icon: <FiSquare size={24} />,
    category: "Dialogs",
  },
];

export default function Home() {
  const component_count = components.length;

  return (
    <div className="cls_home_page min-h-screen p-8 lg:p-12">
      <div className="cls_home_content max-w-6xl mx-auto">
        {/* Header */}
        <header className="cls_home_header mb-12">
          <h1 className="cls_home_title text-4xl lg:text-5xl font-bold mb-4">
            hazo_ui Component Library
          </h1>
          <p className="cls_home_subtitle text-xl text-muted-foreground mb-6">
            React UI components for SaaS applications
          </p>
          <div className="cls_home_stats flex gap-6 text-sm text-muted-foreground">
            <div className="cls_stat_item">
              <span className="font-semibold text-foreground">{component_count}</span> Components
            </div>
            <div className="cls_stat_item">
              <span className="font-semibold text-foreground">React 18+</span>
            </div>
            <div className="cls_stat_item">
              <span className="font-semibold text-foreground">TypeScript</span>
            </div>
            <div className="cls_stat_item">
              <span className="font-semibold text-foreground">TailwindCSS</span>
            </div>
          </div>
        </header>

        {/* Quick Start */}
        <section className="cls_quick_start mb-12 p-6 rounded-lg border bg-card">
          <h2 className="cls_section_title text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="cls_quick_start_content space-y-4">
            <div className="cls_quick_start_step">
              <h3 className="font-medium mb-2">1. Install the package</h3>
              <code className="cls_code_block block p-3 rounded bg-muted text-sm">
                npm install hazo_ui
              </code>
            </div>
            <div className="cls_quick_start_step">
              <h3 className="font-medium mb-2">2. Import components</h3>
              <code className="cls_code_block block p-3 rounded bg-muted text-sm">
                import &#123; HazoUiMultiFilterDialog, HazoUiFlexRadio &#125; from &quot;hazo_ui&quot;;
              </code>
            </div>
            <div className="cls_quick_start_step">
              <h3 className="font-medium mb-2">3. Import styles</h3>
              <code className="cls_code_block block p-3 rounded bg-muted text-sm">
                import &quot;hazo_ui/styles.css&quot;;
              </code>
            </div>
          </div>
        </section>

        {/* Component Grid */}
        <section className="cls_components_section">
          <h2 className="cls_section_title text-2xl font-semibold mb-6">Components</h2>
          <div className="cls_component_grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <Link
                key={component.href}
                href={component.href}
                className="cls_component_card group block p-6 rounded-lg border bg-card hover:border-primary hover:shadow-md transition-all"
              >
                <div className="cls_card_icon mb-4 text-primary">
                  {component.icon}
                </div>
                <h3 className="cls_card_title text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {component.title}
                </h3>
                <p className="cls_card_description text-sm text-muted-foreground mb-3">
                  {component.description}
                </p>
                <div className="cls_card_category text-xs text-muted-foreground">
                  {component.category}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="cls_features_section mt-12 p-6 rounded-lg border bg-card">
          <h2 className="cls_section_title text-2xl font-semibold mb-6">Features</h2>
          <div className="cls_features_grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="cls_feature_item">
              <h3 className="font-medium mb-2">🎨 Customizable Theming</h3>
              <p className="text-sm text-muted-foreground">
                HSL-based CSS variables for easy light/dark mode support
              </p>
            </div>
            <div className="cls_feature_item">
              <h3 className="font-medium mb-2">♿ Accessible</h3>
              <p className="text-sm text-muted-foreground">
                Built with Radix UI primitives for ARIA compliance
              </p>
            </div>
            <div className="cls_feature_item">
              <h3 className="font-medium mb-2">📦 Tree-Shakeable</h3>
              <p className="text-sm text-muted-foreground">
                Import only what you need with ESM exports
              </p>
            </div>
            <div className="cls_feature_item">
              <h3 className="font-medium mb-2">🔧 TypeScript First</h3>
              <p className="text-sm text-muted-foreground">
                Full type safety with exported TypeScript definitions
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

