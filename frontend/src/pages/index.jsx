import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import UserLayout from "@/layout/UserLayout";


export default function Home() {
const router = useRouter();

  return (
    <UserLayout>
   <div className={styles.Container}>

<div className={styles.mainContainer}>
  <div className={styles.mainContainer__left}>
<p>Connect with Friends without exaggeration</p>

<p>A True social media platform with stories no bluffs!</p>


  <div className={styles.buttonJoin} onClick={()=>{
   router.push("/login")

  }} >
    <p>Join now</p>
  </div>
  </div>


  <div className={styles.mainContainer__right}>
    <img src="image/connection.jpg" alt=""/>
  </div>
</div>

   </div>
    </UserLayout>
  );
}
