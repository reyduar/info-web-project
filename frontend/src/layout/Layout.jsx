import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar, Footer } from "./";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 p-8 bg-pastel-gray">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
