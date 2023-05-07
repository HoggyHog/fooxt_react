import React from 'react'
import ig from '../img/ig.jpg'
import li from '../img/linkedin.jpg'
import {MdCall, MdEmail, MdLocationCity, MdMailOutline}  from 'react-icons/md'
import {AiFillInstagram,AiFillLinkedin} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='w-screen h-[50vh] flex flex-row justify-end p-10 items-center bg-fooxtBlack'>
      <div className='w-[50vw] h-[50vh] '>
          <div className='md:text-center text-5xl text-white -mx-[10vw] sm:-mx-[5vw]'>
                FOOXT
          </div>

       

          <div className='w-full -mx-[10vw] md:-mx-0'>
            <div className='text-white text-base text-center mt-20'> SOCIAL LINKS </div>
            <div className='md:w-32 md:h-20  flex justify-around m-auto bg-fooxtBlack mt-10'>
                <a href="https://www.instagram.com/connectfooxt">
                <AiFillInstagram className="text-white md:h-10 md:w-10 w-8 h-8 "  />
                </a>
                <a href="https://www.linkedin.com/company/fooxtindia/">
                <AiFillLinkedin  className="text-white md:h-10 md:w-10 w-8 h-8 "/></a>
            </div>
          </div>
      </div>

        

      <div className='w-[50vw] h-[50vh] flex flex-row mx-auto justify-around'>

          <div className='bg-fooxtBlack h-full w-[40vw] text-white text-center flex flex-col justify-center  md:border-none'> 
              <span className='sm:text-xl md:text-2xl '> CONTACT US</span>
             
              <div className='w-[40vw] md:w-[30vw] h-[12vh] md:h-[8vh] my-[2vh] mx-auto text-white flex flex-col md:flex-row justify-start md:text-base sm:text-sm sm:text-center'>
                <MdCall className='mt-1 w-8 h-8 hidden md:block'/> 
                <div className='mx-auto md:m-0 md:mx-12 block'>7012405229</div>
                <div className='mx-auto md:m-0 md:mx-12 block'>9008132066</div>
              </div>
              <MdCall className='w-8 h-8 md:hidden m-auto -mt-8'/> 
              <div className='w-[40vw] md:w-[30vw] h-[8vh] my-[2vh] mx-auto text-white flex justify-start md:text-base sm:text-sm'>
                <MdEmail className='mt-1 w-8 h-8 hidden md:block'/> 
                <span className='m-auto md:m-0 md:mx-12 '>connect@fooxt.com</span>
              </div>
              <MdEmail className='w-8 h-8 md:hidden m-auto -mt-8'/> 
              <div className='w-[40vw] md:w-[30vw] h-[12vh] my-5 mx-auto text-white flex justify-startalign-middle items-center md:text-base sm:text-sm '>
                <MdLocationCity className='w-10 h-10 hidden md:block'/>
                <div className='flex flex-col justify-around h-32'>
                 <span className='m-auto md:m-0 md:mx-12 '>Vakola Bridge, Santacruz East</span>
                 <span className='m-auto md:m-0 md:mx-12 -mt-4'>Mumbai 400055</span>
                </div>
              </div>
              <MdLocationCity className='w-10 h-10 md:hidden m-auto -mt-8'/>
          </div>
      
      </div>
        
       
        
       

    </div>
  )
}

export default Footer