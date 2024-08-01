import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="main-background">
      <section className="h-dvh overflow-y-auto">
        <Outlet />
      </section>
    </div>
  );
}

export default AuthLayout;
