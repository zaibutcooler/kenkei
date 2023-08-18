import ProfileBlock from "@/components/ProfileBlock";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <section className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <header className="w-full h-16 shrink-0">Icon</header>
        <ProfileBlock />
      </section>
      <section>{children}</section>
    </div>
  );
};

export default HomeLayout;
