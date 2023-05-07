import React from 'react'
import CartContainer from './CartContainer'
import { useStateValue } from '../context/StateProvider'

const Wallet = () => {

  const [{cartShow},dispatch] = useStateValue()
  return (
    <>
  
    <div className='h-[80vh] w-screen flex justify-center items-center'>
        <div className='h-[20vw] text-4xl'>
            COMING SOON !!!

        </div>
    </div>

    {cartShow && <CartContainer/>}
    </>
  )
}

export default Wallet