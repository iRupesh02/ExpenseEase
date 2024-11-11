import React from 'react'
import { SignIn } from '@clerk/nextjs'
const page = () => {
  return (

<section className='flex items-center justify-center mt-20'>
  <SignIn />
</section>
  )
}

export default page
