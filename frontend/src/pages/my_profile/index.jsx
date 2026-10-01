import DashBoardLayout from '@/layout/DashBoardLayout'
import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function my_profile() {
  const router = useRouter();

  useEffect(() => {
    router.push("/profile");
  }, []);

  return (
    <>
      <UserLayout>
        <DashBoardLayout>
        </DashBoardLayout>
      </UserLayout>
    </>
  )
}