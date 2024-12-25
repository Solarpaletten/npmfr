import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Star } from "lucide-react";
import confetti from "canvas-confetti";
import styles from "./index.module.css";
import SeasonalDecorations from '../SeasonalDecorations';

const Page = ({ loading, error, children }) => {
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#ffff00'],
    });
  };

  const showContent = () => {
    if (loading) return <Loader />;
    if (error) return <Error error={error} />;
    
    return (
      <div className={`${styles.container} festive-container`} onClick={launchConfetti}>
        <div className="sparkle-header">
          <Star className="icon-sparkle" />
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <main>
        <Header />
        <SeasonalDecorations />
        {showContent()}
      </main>
    </div>
  );
};

export default Page;