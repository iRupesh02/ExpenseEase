import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashBoardHeader() {

  return (
    <div className='p-3 shadow-sm border-b flex justify-between'>
        <div></div>
        <div>
            <UserButton signInUrl='/sign-in'/>
        </div>
      
    </div>
  )
}

export default DashBoardHeader
