"use-client";

import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden md:flex w-1/4 bg-gray-100 flex-col items-center py-8 px-4">
      <div className="text-2xl font-bold italic text-blue-600">Lawpath</div>
      <div className="mt-4 text-center text-sm text-gray-600 leading-relaxed">
        Lawpath is Australia&apos;s leading online legal platform, helping
        businesses and individuals manage their legal needs efficiently and
        affordably. From creating legal documents to connecting with expert
        lawyers, Lawpath empowers you to take control of your legal matters with
        ease and confidence.
      </div>
    </div>
  );
};

export default Sidebar;
