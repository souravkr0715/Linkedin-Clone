import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router'
import { useState } from 'react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {

const dispatch = useDispatch();
const router = useRouter();
const authState = useSelector((state)=>state.auth)
const [isTokenThere , setIsTokenThere] = useState(false);

useEffect(()=>{
    if(localStorage.getItem('token')===null){
    router.push("/login");
    }
},[router])

useEffect(()=>{
  
if(isTokenThere){
  dispatch(getAllPosts())
  dispatch(getAllPosts({token:localStorage.getItem('token')}))



}


},[isTokenThere])

  return (
    <div>Dashboard</div>
  )
}
