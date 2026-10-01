import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import UserLayout from '@/layout/UserLayout'
import DashBoardLayout from '@/layout/DashBoardLayout'
import { BASE_URL, clientServer } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutUser } from '@/config/redux/action/authAction'
import { getAllPosts } from '@/config/redux/action/postAction'





export default function ProfilePage() {


  const [isModalOpen,setisModalOpen] = useState(false);
    const dispatch = useDispatch();
    const authState = useSelector((state)=>state.auth)
    const postReducer = useSelector((state)=>state.postReducer);

    const[userProfile,setUserProfile] =useState({
       
    })

    const [inputData , setInputData] = useState({companyName:'',position:'',years:'' })

   const handleWorkInputChange = (e)=>{
    const {name ,value} = e.target;
    setInputData({...inputData,[name]:value});
   }

    const[userPosts,setUserPosts]= useState()

    const updateProfileData = async()=>{
      const request = await clientServer.post("/user_update",{
        token:localStorage.getItem("token"),
        name:userProfile?.userId?.name,

      })

const respnse = await clientServer.post("/update_profile_data",{
  token:localStorage.getItem("token"),
  bio:userProfile?.bio,
  currentPost : userProfile?.currentPost,
  pastWork:userProfile?.pastWork,
  education:userProfile?.education
})

dispatch(getAboutUser({token:localStorage.getItem("token")}))


    }



    

useEffect(()=>{
    dispatch(getAboutUser({token:localStorage.getItem("token")}))
    dispatch(getAllPosts())
},[])

useEffect(()=>{
    setUserProfile(authState.user)

    if(authState.user){
       let post = postReducer.posts.filter((post)=>{
      return post.userId?.username === userProfile?.userId?.username
    })
     setUserPosts(post);
    }
},[authState.user],[postReducer.posts])



const updateProfilePicture = async(file)=>{

const formData = new FormData();
formData.append("profile_picture",file);
formData.append("token",localStorage.getItem("token"))

const response = await clientServer.post("/upload_profile_picture",formData,{
  headers:{
    'Content-Type':'multipart/form-data',
  },
});

dispatch(getAboutUser({token:localStorage.getItem("token")}));




}


  return (
    <>
    <UserLayout>
        <DashBoardLayout>
            {authState.user && userProfile?.userId && (
                <>
              <div className={styles.container}>
         <div className={styles.backDropContainer}>
         <label htmlFor='profilePictureUpload' className={styles.backDrop__overlay}>
          <p>
            Edit
          </p>
         </label>
         <input onChange={(e)=>{
          updateProfilePicture(e.target.files[0])
         }} type='file' id='profilePictureUpload'   className={styles.profilePictureInput}/>
  <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId?.profilePicture}`}/>
</div>

<div className={styles.profileContainer__details}>
 <input  className={styles.nameEdit} type='text' value={userProfile.userId?.name} onChange={(e)=>{
  setUserProfile({...userProfile,userId:{...userProfile.userId,name:e.target.value}})
 }}/>
  <p style={{color:"grey"}}>@{userProfile.userId?.username}</p>

 


<div >
  <textarea style={{width:"100%"}}
  value={userProfile.bio}
  onChange={(e)=>{
    setUserProfile({...userProfile,bio:e.target.value})
  }}

  rows={Math.max(3,Math.ceil(userProfile.bio.length/80))}
  
  />
  </div>
</div>
          </div>
<div style={{ flex: "0.2" }}>
  <h3>Recent Activity</h3>

  {userPosts?.map((post) => {
    return (
      <div key={post._id} className={styles.postCard}>
        <div className={styles.card}>
          <div className={styles.card__profileContainer}>
            {post.media !== "" ? (
  <img src={`${BASE_URL}/${post.media}`} />
) : (
  <div style={{ width: "3.4rem", height: "3.4rem" }}></div>
)}
          </div>

          <p>{post.body}</p>
        </div>
      </div>
    );
  })}


  <div className={styles.workHistory}>
    <h2>Work History</h2>

    <div className={styles.workHistoryContainer}>
      {
        userProfile.pastWork.map((work,index)=>{
          return(
            <div key={index} className={styles.workHistoryCard}>
              <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}> {work.companyName} - {work.position}</p>
              <p>{work.years}</p>
              </div>
          )
        })
      }
  
  <button className={styles.addWorkButton} onClick={()=>{
setisModalOpen(true)
  }}>Add Work</button>



    </div>
  </div>


        {userProfile != authState.user && 
        <div onClick={()=>{
          updateProfileData();
        }} className={styles.updateProfileBtn}> Update Profile</div>
        }

</div>
</>)
}

 {
          isModalOpen && 
          <div 
          onClick={()=>{
            setisModalOpen(false)
          }}
          className={styles.commentsContainer}>
            <div onClick={(e)=>{
              e.stopPropagation()
            }} className={styles.allCommentsContainer}>
           
               <input
                onChange={handleWorkInputChange}
                name='companyName'
                className={styles.inputField}
                type="text"
                placeholder="Enter Company"
              />
               <input
                onChange={handleWorkInputChange}
                name='position'
                className={styles.inputField}
                type="text"
                placeholder="Enter Position"
              />
               <input
                onChange={handleWorkInputChange}
                name='years'
                className={styles.inputField}
                type="number"
                placeholder="Enter Work Years"
              />

              <div onClick={()=>{
                setUserProfile({...userProfile,pastWork:[...userProfile.pastWork,inputData]})
                setisModalOpen(false)
              }} className={styles.updateProfileBtn}> Add Work</div>
              </div>
           
          </div>
      
        }
        </DashBoardLayout>
    </UserLayout>
    </>
  )
}
