import React, { useState } from "react";
// import Header from "../components/Layout/Header";
// import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSidebar from "../components/Profile/ProfileSidebar";

import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

// const ProfilePage = () => {

//   const [active, setActive] = useState(1);

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           {/* <Header /> */}
//           <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
//             <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
//               <ProfileSideBar active={active} setActive={setActive} />
//             </div>
//             <ProfileContent active={active} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;



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
           <div className={styles.container} style={{position:"fluid"}}>
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

