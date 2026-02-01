// Root layout for hazo_ui dev app
// Provides global styles and structure for testing components
import type { Metadata } from "next";
import "../globals.css";
import "../../src/styles/globals.css";
import Sidebar from "../components/sidebar";

export const metadata: Metadata = {
  title: "hazo_ui Dev App",
  description: "Development app for testing hazo_ui components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="cls_dev_app_body">
        <div className="cls_app_container flex min-h-screen">
          <Sidebar />
          <main className="cls_main_content flex-1 overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

