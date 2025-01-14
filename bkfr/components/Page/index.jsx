import React from "react";
import Error from "../Error";
import Header from "../Header";
import Loader from "../Loader";
import Sidebar from "../Sidebar";

import styles from "./index.module.css";

function Page({ loading, error, children }) {
  const showContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return <div className={styles.container}>{children}</div>;
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <main>
        <Header />
        {showContent()}
      </main>
    </div>
  );
}

export default Page;