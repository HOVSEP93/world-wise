import Logo from "../logo/Logo";
import AppNav from "../app-nav/AppNav";
import styles from "./Sidebar.module.css";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
