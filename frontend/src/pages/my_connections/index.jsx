import { BASE_URL } from '@/config';
import { AcceptConnection, getConnectionRequests } from '@/config/redux/action/authAction';
import DashBoardLayout from '@/layout/DashBoardLayout';
import UserLayout from '@/layout/UserLayout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./index.module.css";
import { useRouter } from 'next/router';
import { connection } from 'next/server';

export default function MyConnectionsPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      getConnectionRequests({
        token: localStorage.getItem("token"),
      })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log("Redux connection:", authState.connection);
  }, [authState.connection]);

  return (
    <>
      <UserLayout>

        <DashBoardLayout>
          <div style={{display:"flex",flexDirection:"column",gap:"1.7rem"}}>
       <h1>My connections</h1>
            
            {authState.connection.length === 0 && <h1>NO CONNECTION REQUEST</h1>}

            {authState.connection.length !== 0 &&

            authState.connection.filter((connection)=>connection.status_accepted === null)
              .map((user, index) => {
                return (<>
                 
                  <div onClick={()=>{
                    router.push(`/view_profile/${user.userId.username}`)
                  }} className={styles.useCard} key={index}>
                    <div style={{ display: "flex", alignItems: "center",gap:"1.2rem" }}>

                      <div className={styles.profilePicture}>
                        <img 
                          src={`${BASE_URL}/${user?.userId?.profilePicture}`}
                          alt=""
                        />
                      </div>

                      <div className={styles.userInfo}>
                        <h3>{user?.userId?.name}</h3>
                        <p>{user?.userId?.username}</p>
                      </div>
                      <button onClick={(e)=>{
                        e.stopPropagation();

                        dispatch(AcceptConnection({
                          connectionId:user._id,
                          token:localStorage.getItem("token"),
                          action:"accept"
                        }))
                      }} className={styles.connectedButton}>Accept</button>

                    </div>
                  </div>
                  </>
                );
              })}

              <h4>My Network</h4>

{authState.connectionRequest.map((user)=><p>user.id</p>)}
             {authState.connection
  .filter((connection) => connection.status_accepted !== null)
  .map((user, index) => {
    return (
      <>
        <div
          onClick={() => {
            router.push(`/view_profile/${user.userId.username}`);
          }}
          className={styles.useCard}
          key={index}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            <div className={styles.profilePicture}>
              <img
                src={`${BASE_URL}/${user?.userId?.profilePicture}`}
                alt=""
              />
            </div>

            <div className={styles.userInfo}>
              <h3>{user?.userId?.name}</h3>
              <p>{user?.userId?.username}</p>
            </div>
          </div>
        </div>
      </>
    );
  })}
          </div>
        </DashBoardLayout>

      </UserLayout>
    </>
  );
}