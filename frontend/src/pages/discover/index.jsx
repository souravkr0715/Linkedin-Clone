import { BASE_URL } from '@/config'
import { getAllUsers } from '@/config/redux/action/authAction'
import DashBoardLayout from '@/layout/DashBoardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./index.module.css"
import { useRouter } from 'next/router'

export default function DiscoverPage() {

    const authState = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        if(!authState.all_profiles_fetched){
            dispatch(getAllUsers());
        }
    },[])
  return (
   <>

   <UserLayout>
      
         <DashBoardLayout>
          <div>
  <h1>Discover</h1>
<div className={styles.allUserProfile}>
  {authState.all_profiles_fetched && authState.all_users.map((user)=>{
  return(
    <div onClick={()=>{
      router.push(`/view_profile/${user.userId?.username}`)
    }} key={user._id} className={styles.userCard}>
      <img className={styles.userCard_image} style={{width:100}} src={`${BASE_URL}/${user.userId.profilePicture}`} alt='profile'/>
     <div>
       <i> <h4>{user.userId?.name}</h4></i>
       
        <p>{user.userId?.username}</p>
     </div>
      </div>
  )})}

</div>


  {/* {authState.all_users?.map((user) => (
    <div key={user._id}>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  ))} */}
</div>
         </DashBoardLayout>
      
      
      
      
          
           </UserLayout></>
     
  
  )
}
