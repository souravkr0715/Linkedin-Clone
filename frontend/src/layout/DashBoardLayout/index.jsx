// import React from 'react'

// import styles from "./index.module.css"

// export default function DashBoardLayout({children}) {
//   return (<>

  
//    <div className="container">
  
//   <div className={styles.homeContainer}>
  
//     <div className={styles.homeContainer__leftBar}>


// <div className={styles.sideBarOption}>

//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
// </svg>
// Scroll

// </div>

// <div className={styles.sideBarOption}>

//    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
// </svg>

// Discover
// </div>

//     </div>
//   </div>
  
//       <div className="homeContainer__feedContainer">
//   {children}
//       </div>
  
  
//   <div className="homeContainer__extraContainer"></div>
  
//       </div>
  
  
//   </>
   
//   )
// }


import React, { useEffect } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { setTokenIsThere } from "@/config/redux/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";



export default function DashBoardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state.auth);

console.log("AUTH STATE:", authstate);
console.log("ALL PROFILES:", authstate.all_profiles);


  useEffect(()=>{
   
      if(localStorage.getItem('token')===null){
      router.push("/login");
  
  
      }else{
       dispatch (setTokenIsThere(true));
      }
  },[router])
  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>

        {/* Left Sidebar */}
        <div className={styles.homeContainer__leftBar}>

          <div onClick={()=>{
            router.push("/dashboard")
          }} className={styles.sideBarOption}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <span>Scroll</span>
          </div>

          <div  onClick={()=>{
            router.push("/discover")
          }}className={styles.sideBarOption}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <span>Discover</span>
          </div>

          <div onClick={()=>{
            router.push("/my_profile")
          }} className={styles.sideBarOption}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <span>My Profile</span>
          </div>

          <div onClick={()=>{
            router.push("/my_connections")
          }} className={styles.sideBarOption}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-.946 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>

            <span>Connections</span>
          </div>

        </div>

        {/* Main Feed */}
        <div className={styles.homeContainer__feedContainer}>
          {children}
        </div>

        {/* Right Side */}
        <div className={styles.homeContainer__extraContainer}>
          <h2>Top Profiles</h2>

     {authstate.all_profiles?.map((profile) => {
  return (
    <div
      key={profile._id}
      className={styles.extraContainer__profile}
    >
      <img src={profile.profilePicture} alt="" />
      <p>{profile.userId.name}</p>
    </div>
  );
})}
        </div>

      </div>
    </div>
  );
}