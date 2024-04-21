import React, { useState } from "react";
// import Header from "../components/Layout/Header";
// import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSidebar from "../components/Profile/ProfileSidebar";

import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";





import styles from "./SideBarPage.module.css"





const ProfilePage = () => {
    const { loading } = useSelector((state) => state.user);
   
    
    const [active, setActive] = useState(1);
    
   
    return (
      
         <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <Header /> */}
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
           <div className={styles.container} style={{position:"fluid" ,width:"100%"}}>
            <ProfileSidebar  active={active} setActive={setActive}/>
         <ProfileContent active={active} />
     </div>
          </div>
        </>
      )}
    </div>
    );
};

export default ProfilePage;


