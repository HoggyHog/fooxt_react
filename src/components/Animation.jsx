import React, { useEffect,useLayoutEffect } from 'react'
import Header from './Header'

import screen1 from '../img/screen1.png'
import screen2 from '../img/screen2.png'
import screen3 from '../img/screen3.png'  
import screen4 from '../img/screen4.png'
import screen5 from '../img/screen5.png'
import screen6 from '../img/screen6.png'
import screen7 from '../img/screen7.png'
import screen8 from '../img/screen8.png'
import screen9 from '../img/screen9.png'



import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let mm=gsap.matchMedia();

const Animation = () => {



/* useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    // put all your GSAP/ScrollTrigger code inside here...
    

    

  

      




    });

    
  
    return () => ctx.revert();// <-- CLEANUP!
}, []); */

useLayoutEffect(()=>{
  let ctx=gsap.context(()=>{

    
   
 

    mm.add("(min-width:790px)",()=>{
     const t1=gsap.timeline({
        scrollTrigger:{
          trigger:'.animation-middle1',
          markers:false,
          start:'top 20%',
          end:'bottom 20%', 
          scrub:true,
          pin:'.animation-middle1'
        }
      }) 

      const tl1=gsap.timeline({
        scrollTrigger:{
          trigger:'.animation-start1',
          markers:false,
          start:'top 20%',
          end:'bottom 20%', 
          scrub:true,
          pin:'.animation-start1'
        }
      })

       t1.to('.play-list1',{
        scale:1.2,
        duration:3,
        color:'#2a2c39',
        fontWeight:'bold',
        x:40,
      }).to('.play-list1',{
          scale:1,
          duration:3,
          x:0,
      }).to('.play-list2',{
          scale:1.2,
          duration:3,  
          color:'#2a2c39',
          fontWeight:'bold',
          x:40,
        }).to('.play-list2',{
          scale:1,
          duration:3,
          x:0,
    
        }).to('.play-list3',{
          scale:1.2,
          duration:3,
          color:'#2a2c39',
          fontWeight:'bold',
          x:40,
        }).to('.play-list3',{
          scale:1,
          duration:3,
          x:0,
       
        }).to('.play-list4',{
          scale:1.2,
          duration:3,
          color:'#2a2c39',
          fontWeight:'bold',
          x:40,
        }).to('.play-list4',{
          scale:1,
          duration:3,
          x:0,
      
        }).to('.play-list5',{
          scale:1.2,
          duration:3,
          color:'#2a2c39',
          fontWeight:'bold',
          x:40,
        }).to('.play-list5',{
          scale:1,
          duration:3,
          x:0,
       
        }).to('.play-list6',{
          scale:1.2,
          duration:3,
          color:'#2a2c39  ',
          fontWeight:'bold',
          x:40,
        }).to('.play-list6',{
          scale:1,
          duration:3,
          x:0,
      
        })


      tl1.to('.play-mobile',{
        scale:1.15,
        duration:6,
        x:-20,
      }).to('.play-mobile-screen1',{
        opacity:0,
        duration:2,
        delay:0.5,
      }).to('.play-mobile-screen2',{
        opacity:1,
        duration:3, 
        delay:0.5, 
      }).to('.play-mobile-screen2',{
        opacity:0,
        duration:1,
        delay:0.5
      }).to('.play-mobile-screen3',{
        opacity:1,
        duration:3,
        delay:0.5,  
      }).to('.play-mobile-screen3',{
        opacity:0,
        duration:1,
        delay:0.5,
      }).to('.play-mobile-screen4',{
        opacity:1,
        duration:3, 
        delay:0.5, 
      }).to('.play-mobile-screen4',{
        opacity:0,
        duration:1,
        delay:0.5,
      }).to('.play-mobile-screen5',{
        opacity:1,
        duration:3, 
        delay:0.5, 
      }).to('.play-mobile-screen5',{
        opacity:0,
        duration:1,
        delay:0.5,
      }).to('.play-mobile-screen6',{
        opacity:1,
        duration:3, 
        delay:0.5, 
      }).to('.play-mobile-screen6',{
        opacity:0,
        duration:1,
        delay:0.5,
      }).to('.play-mobile-screen7',{
        opacity:1,
        duration:3, 
        delay:0.5,
      }).to('.play-mobile-screen7',{
        opacity:0,
        duration:``,
       delay:0.5, 
      }).to('.play-mobile-screen8',{
        opacity:1,
        duration:6, 
       delay:0.5, 
      }).to('.play-mobile-screen8',{
        opacity:0,
        duration:2,
        delay:0.5, 
      }).to('.play-mobile-screen9',{
        opacity:1,
        duration:6, 
        delay:0.5, 
      }).to('.play-mobile',{
        x:20,
        scale:1,
        duration:2,
      }) 
  
    
    })

    mm.add("(max-width:789px)",()=>{
      const t1=gsap.timeline({
         scrollTrigger:{
           trigger:'.animation-middle2',
           markers:false,
           start:'top 20%',
           end:'bottom 20%', 
           scrub:true,
           pin:'.animation-middle2'
         }
       }) 
 
       const tl1=gsap.timeline({
         scrollTrigger:{
           trigger:'.animation-start1',
           markers:false,
           start:'top 20%',
           end:'bottom 20%', 
           scrub:true,
           pin:'.animation-start1'
         }
       })
 
        t1.to('.play-list1',{
         scale:1.1,
         duration:3,
         color:'#2a2c39',
         fontWeight:'bold',
         x:0,
       }).to('.play-list1',{
           scale:1,
           duration:3,
           x:0,
           opacity:0
       }).to('.play-list2',{
           opacity:100, 
           scale:1.05,
           duration:3,  
           color:'#2a2c39',
           fontWeight:'bold',
          
         }).to('.play-list2',{
           scale:1,
           duration:3,
           x:0,
           opacity:0
     
         }).to('.play-list3',{
           scale:1.1,
           duration:3,
           color:'#2a2c39',
           fontWeight:'bold',
         
           opacity:100
         }).to('.play-list3',{
           scale:1,
           duration:3,
           x:0,
          opacity:0
         }).to('.play-list4',{
           scale:1.05,
           duration:3,
           color:'#2a2c39',
           fontWeight:'bold',
    
           opacity:100
         }).to('.play-list4',{
           scale:1,
           duration:3,
           x:0,
          opacity:0
         }).to('.play-list5',{
           scale:1.1,
           duration:3,
           color:'#2a2c39',
           fontWeight:'bold',
          
           opacity:100
         }).to('.play-list5',{
           scale:1,
           duration:3,
           x:0,
          opacity:0
         }).to('.play-list6',{
           scale:1.1,
           duration:3,
           color:'#2a2c39  ',
           fontWeight:'bold',
     
           opacity:100
         }).to('.play-list6',{
           scale:1,
           duration:3,
           x:0,
          opacity:0
         })
 
 
       tl1.to('.play-mobile',{
         scale:1.3,
         duration:6,
         x:0,
       }).to('.play-mobile-screen1',{
         opacity:0,
         duration:2,
         delay:0.5,
       }).to('.play-mobile-screen2',{
         opacity:1,
         duration:3, 
         delay:0.5, 
       }).to('.play-mobile-screen2',{
         opacity:0,
         duration:1,
         delay:0.5
       }).to('.play-mobile-screen3',{
         opacity:1,
         duration:3,
         delay:0.5,  
       }).to('.play-mobile-screen3',{
         opacity:0,
         duration:1,
         delay:0.5,
       }).to('.play-mobile-screen4',{
         opacity:1,
         duration:3, 
         delay:0.5, 
       }).to('.play-mobile-screen4',{
         opacity:0,
         duration:1,
         delay:0.5,
       }).to('.play-mobile-screen5',{
         opacity:1,
         duration:3, 
         delay:0.5, 
       }).to('.play-mobile-screen5',{
         opacity:0,
         duration:1,
         delay:0.5,
       }).to('.play-mobile-screen6',{
         opacity:1,
         duration:3, 
         delay:0.5, 
       }).to('.play-mobile-screen6',{
         opacity:0,
         duration:1,
         delay:0.5,
       }).to('.play-mobile-screen7',{
         opacity:1,
         duration:3, 
         delay:0.5,
       }).to('.play-mobile-screen7',{
         opacity:0,
         duration:``,
        delay:0.5, 
       }).to('.play-mobile-screen8',{
         opacity:1,
         duration:6, 
        delay:0.5, 
       }).to('.play-mobile-screen8',{
         opacity:0,
         duration:2,
         delay:0.5, 
       }).to('.play-mobile-screen9',{
         opacity:1,
         duration:6, 
         delay:0.5, 
       }).to('.play-mobile',{
         x:0,
         scale:1,
         duration:2,
       }) 
   
     
     })  

    

  })
    

  return () => ctx.revert();

},[]) 


  return (
    <div className='h-[160vh] md:h-[165vh] bg-fooxtYellow'>
        <h1 className='md:text-6xl sm:text-3xl text-2xl font-semibold pt-[5vh] mx-[3vw]'>our upcoming product</h1>
        <div className=' bg-fooxtYellow flex justify-start'>
          
        <div className='animation-middle2'>

        </div>
        {/* <div className='w-screen h-[70vh] flex flex-row animation-start1 relative mb-10'>
            <div className='w-[80vw] h-[20vh] flex flex-col  justify-around md:p-10 py-10 bg-fooxtYellow'>
                    <div className='play-list1 text-base md:text-lg text-center md:text-left'>1) Enter your goals, medical histories and preferences</div>
                    <div className='play-list2 text-base md:text-lg text-center md:text-left'>2) Order from any of the 3 options(trending recipes from Food Social) </div>
                    <div className='play-list3 text-base md:text-baselg  text-center md:text-left'>3) Engage in a 4-step creation process, guided by AI and macrometers</div>
                    <div className='play-list4 text-base md:text-lg text-center md:text-left'>4) Wait for a kitchen in the vicinity to accept your order</div>
                    <div className='play-list5 text-xl md:text-lg text-center md:text-left'>5) Share your creation on Food Social!   </div>
                    <div className='play-list6 text-base md:text-baselg text-center md:text-left'>6)Enjoy features like Meal of the Day(snap your meal to get its nutrition information)</div>
            </div>
            <div className='animation-middle1'>

            </div>
            <div className='w-screen h-full bg-fooxtYellow p-10 flex justify-center'>
                <div className='play-mobile bg-mobile w-[50vw] h-[40vh] md:w-[20vw] md:h-[60vh] bg-center bg-no-repeat bg-contain p-8 md:p-10 2xl:p-14'>
                    <img className="play-mobile-screen1 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%]  -mt-5 md:-mt-5 2xl:-mt-9 absolute " src={screen1}/>
                    <img className="play-mobile-screen2 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen2}/>
                    <img className="play-mobile-screen3 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen3}/>
                    <img className="play-mobile-screen4 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen4}/>
                    <img className="play-mobile-screen5 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen5}/>
                    <img className="play-mobile-screen6 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen6}/>
                    <img className="play-mobile-screen7 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen7}/>
                    <img className="play-mobile-screen8 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen8}/>
                    <img className="play-mobile-screen9 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] -mt-5 md:-mt-5 2xl:-mt-9 opacity-0 absolute " src={screen9}/>
     
                </div>
            </div>

        </div> */}

        <div className='w-screen h-[70vh] flex md:flex-row flex-col animation-start1 relative mb-10'>
            <div className='w-[80vw] h-[20vh] md:w-[75vw] md:h-[70vh] flex flex-col  justify-around md:p-10 py-10 bg-fooxtYellow'>
                    <div className='play-list1 text-base md:text-lg absolute md:relative text-center md:text-left'>1) Enter your goals, medical histories and preferences</div>
                    <div className='play-list2 text-base md:text-lg absolute md:relative opacity-0 md:opacity-100 md:block text-center md:text-left'>2) Order from any of the 3 options(trending recipes from Food Social) </div>
                    <div className='play-list3 text-base md:text-baselg absolute md:relative opacity-0 md:opacity-100 md:block text-center md:text-left'>3) Engage in a 4-step creation process, guided by AI and macrometers</div>
                    <div className='play-list4 text-base md:text-lg absolute md:relative opacity-0 md:opacity-100 md:block text-center md:text-left'>4) Wait for a kitchen in the vicinity to accept your order</div>
                    <div className='play-list5 text-xl md:text-lg absolute md:relative opacity-0 md:opacity-100 md:block text-center md:text-left'>5) Share your creation on Food Social!   </div>
                    <div className='play-list6 text-base md:text-baselg absolute md:relative opacity-0 md:opacity-100 md:block text-center md:text-left'>6)Enjoy features like Meal of the Day(snap your meal to get its nutrition information)</div>
            </div>
            <div className='animation-middle1'>

            </div>
            <div className='w-screen md:w-[50vw] h-full bg-fooxtYellow p-10 flex justify-center'>
                <div className='md:block play-mobile bg-mobile w-[50vw] h-[40vh] md:w-[20vw] md:h-[60vh] bg-center bg-no-repeat bg-contain p-8 md:p-10 2xl:p-14'>
                    <img className="play-mobile-screen1 2xl:w-[12.5vw] md:w-[14.5vw] w-[65%] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 absolute -mx-0 xsm:-mx-3" src={screen1}/>
                    <img className="play-mobile-screen2 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3" src={screen2}/>
                    <img className="play-mobile-screen3 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3" src={screen3}/>
                    <img className="play-mobile-screen4 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3 " src={screen4}/>
                    <img className="play-mobile-screen5 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3" src={screen5}/>
                    <img className="play-mobile-screen6 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3 " src={screen6}/>
                    <img className="play-mobile-screen7 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3" src={screen7}/>
                    <img className="play-mobile-screen8 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3" src={screen8}/>
                    <img className="play-mobile-screen9 2xl:w-[12.5vw] md:w-[14.5vw] w-[32.5vw] h-[90%] sm:w-[80%] -mt-5 sm:-mt-4 md:-mt-5 2xl:-mt-9 opacity-0 absolute -mx-0 xsm:-mx-3" src={screen9}/>
     
                </div>
            </div>

        </div> 

        </div>
        
    </div>
  )
}

export default Animation



