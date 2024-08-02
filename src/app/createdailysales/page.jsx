"use client";

import { useState } from "react";
import DailyForm from "../components/DailyForm";
import InfoDrawer from "../components/InfoDrawer";

export default function DailySales() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const toggleDrawer = (content) => {
    setDrawerContent(content);
    setShowDrawer((prevState) => !prevState);
  };

  const additionalInfo = {
    title: "Daily Sales Information",
    details: `This is where you will fill in the your day's sales data.\n
    Even if there are no sales for the category, make sure to still put $0!
    `,
  };

  return (
    <main className="main-container">
      <h1 className="heading">Daily Sales</h1>
      <p className="paragraph">
        *Be careful what you submit! Functionality for editing is not available
        yet!*
      </p>
      <button
        onClick={() => toggleDrawer(additionalInfo)}
        className="btn flex justify-center items-center mx-auto"
      >
        Show More Info
      </button>
      <DailyForm />
      {showDrawer && (
        <InfoDrawer
          onClose={() => setShowDrawer(false)}
          drawerContent={drawerContent}
        />
      )}
    </main>
  );
}
