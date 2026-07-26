import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";

export default function LoginComponent() {
  const authState = useSelector((state) => state.auth);

  const router = useRouter();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  useEffect(()=>{
   dispatch(emptyMessage());
  },[userLoginMethod,dispatch]);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/dashboard");
    }
  },[router])

  const handleRegister = () => {
    console.log("Registering");
    dispatch(registerUser({ username, password, email, name }));
  };

  const handleLogin = () => {
    dispatch(
      loginUser({
        email,
        password,
      }),
    );
  };
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer__left}>
            <p className={styles.cardleft__heading}>
              {userLoginMethod ? "Sign In" : "Sign Up"}
            </p>
            <p style={{color:authState.isError ? "red":"green"}}>{authState.message.message}</p>
            <div className={styles.inputContainer}>
          {!userLoginMethod &&     <div className={styles.inputRow}>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Name"
                />
              </div>}
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                type="text"
                placeholder="Email"
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder="Password"
              />

              <div
                onClick={() => {
                  if (userLoginMethod) {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
                className={styles.buttonWithOutline}
              >
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            </div>
          </div>
          <div className={styles.cardContainer__right}>
            <div>
              {userLoginMethod ? <p>Don't have an Account?</p> : <p>Already have an Account?</p>}
            
                          <div
                onClick={() => {
                  setUserLoginMethod(!userLoginMethod)
                }}
                className={styles.buttonWithOutline}
              >
                <p style={{color:"black",textAlign:"center"}}>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
              </div></div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
