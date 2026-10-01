import { BASE_URL, clientServer } from '@/config';
import DashBoardLayout from '@/layout/DashBoardLayout';
import UserLayout from '@/layout/UserLayout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUser, getAllUsers, getConnectionRequests, getMyConnectionRequests, sendConnectionRequest } from '@/config/redux/action/authAction';
import styles from "./index.module.css";
import { getAllPosts } from '@/config/redux/action/postAction';



export default function ViewProfilePage({ userProfile }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.postReducer);
  const [userPosts,setUserPosts] = useState([]);
  const [isCurrentUserInConnection,setIsCurrentUserInConnection] = useState(false);

  const [isConnectionNull , setIsConnectionNull] = useState(true);

  const getUsersPost = async()=>{
    await dispatch(getAllPosts());
    await dispatch(getConnectionRequests({token:localStorage.getItem("token")}))  // was getMyConnectionRequests
    await dispatch(getMyConnectionRequests({token:localStorage.getItem("token")}))
}

  useEffect(()=>{
    getUsersPost();
  },[]);

  useEffect(()=>{
    let post = postReducer.posts.filter((post)=>{
      return post.userId?.username === userProfile.userId?.username
    })
    setUserPosts(post);
  },[postReducer.posts]);

  // One effect for both lists (state.connection and state.connectionRequest).
  // A record belongs to this profile if either side of it is this profile's user.
  useEffect(()=>{
    const profileId = userProfile?.userId?._id;
    const idOf = (v) => (v && typeof v === "object" ? v._id : v);
    const asArray = (v) => (Array.isArray(v) ? v : []);

    const records = [
      ...asArray(authState.connection),
      ...asArray(authState.connectionRequest),
    ].filter(
      (r) => idOf(r.connectionId) === profileId || idOf(r.userId) === profileId
    );

    // if any record is accepted -> Connected, else Pending
    const record = records.find((r) => r.status_accepted === true) || records[0];

    if (record) {
      setIsCurrentUserInConnection(true);
      setIsConnectionNull(record.status_accepted !== true); // true = Pending
    } else {
      setIsCurrentUserInConnection(false);
      setIsConnectionNull(true);
    }
  },[authState.connection, authState.connectionRequest, userProfile])

  // Keeps the page fresh: refetch when the tab is focused, and every 5s while Pending,
  // so the sender sees "Connected" after the receiver accepts (no reload needed)
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const refresh = () => {
      dispatch(getConnectionRequests({token}));
      dispatch(getMyConnectionRequests({token}));
    };
    window.addEventListener("focus", refresh);
    let interval;
    if (isCurrentUserInConnection && isConnectionNull) {
      interval = setInterval(refresh, 5000);
    }
    return () => {
      window.removeEventListener("focus", refresh);
      if (interval) clearInterval(interval);
    };
  },[isCurrentUserInConnection, isConnectionNull])

  useEffect(() => {
    if (authState.isTokenThere) {
      dispatch(getAboutUser({ token: localStorage.getItem('token') }));
    }
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  if (!userProfile) {
    return <div>Profile not found.</div>;
  }

  return (
    <UserLayout>
      <DashBoardLayout>
        <div className={styles.container}>
         <div className={styles.backDropContainer}>
  <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId?.profilePicture}`}/>
</div>

<div className={styles.profileContainer__details}>
  <h2>{userProfile.userId?.name}</h2>
  <p style={{color:"grey"}}>@{userProfile.userId?.username}</p>

  <div style={{display:"flex",alignItems:"center",gap:"1.2rem"}}>
    {
      isCurrentUserInConnection ?
      <button className={styles.connectedButton}>{isConnectionNull ? "Pending":"Connected"}</button>
      :
      <button onClick={()=>{
        dispatch(sendConnectionRequest({token:localStorage.getItem("token"),connectionId:userProfile.userId?._id}))
      }} className={styles.connectBtn}>Connect</button>
    }


    <div onClick={async()=>{
      const response = await clientServer.get(`/user/download_resume?user_id=${userProfile.userId?._id}`);
      window.open(`${BASE_URL}/${response.data.message}`,"_blank")
    }} style={{cursor:"pointer"}}><svg style={{width:"1.2em"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>
</div>
  </div>
</div>

<p className={styles.bio}>{userProfile.bio}</p>
          </div>
<div style={{ flex: "0.2" }}>
  <h3>Recent Activity</h3>

  {userPosts.map((post) => {
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
              <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{work.company} - {work.position}</p>
              <p>{work.years}</p>
              </div>
          )
        })
      }
    </div>
  </div>
</div>
      </DashBoardLayout>
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;

  try {
    const response = await clientServer.get(
      "/user/get_profile_based_on_username",
      { params: { username } }
    );

    return { props: { userProfile: response.data.profile ?? null } };
  } catch (error) {
    return { props: { userProfile: null } };
  }
}
