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
      <div className="mt-8 text-center text-sm text-gray-500 leading-relaxed">
        Our address validation application leverages the Australian Postcode API
        to ensure accurate suburb, state, and postcode information. By providing
        reliable address data, it helps streamline legal processes, minimize
        errors, and improve overall data integrity, all while adhering to
        Australia&apos;s postal standards.
      </div>
    </div>
  );
};

export default Sidebar;
