"use client"


import { useState } from 'react';
import InfoDrawer from "../components/InfoDrawer";
import UserInfo from '../components/UserInfo';

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const toggleDrawer = (content) => {
    setDrawerContent(content);
    setShowDrawer(prevState => !prevState);
  };

  const additionalInfo = {
    title: "Home Information",
    details: `Now that you're logged in, you can use the navbar to navigate through the site!\n
    If you want to log out, you can click [Log Out] to leave. \n
    You can go to [History] to look at past sales or go to [New Sales] to record your daily sales.
    `
  };


  return (
    <main className="main-container">
      <h1 className="heading">Home</h1>
      {/* <p className="paragraph">Now that you're logged in, you can use the navbar to navigate through the site!</p> */}
      <UserInfo />
      <button
        onClick={() => toggleDrawer(additionalInfo)}
        className="btn flex justify-center items-center mx-auto"
      >
        Show More Info
      </button>
      {/* <p className="paragraph">If you want to log out, you can click <strong>Log Out</strong> to leave.</p>
      <p className="paragraph">You can go to <strong>History</strong> to look at past sales or go to <strong>New Sales</strong> to record your daily sales.</p> */}
      {showDrawer && (
        <InfoDrawer 
          onClose={() => setShowDrawer(false)} 
          drawerContent={drawerContent}
        />
      )}
    </main>
  )
}
