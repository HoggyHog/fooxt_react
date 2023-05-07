import React ,{useState,useEffect}from 'react'
import {  MdAccountCircle,
    MdCall,
    MdEmail, MdCancel,MdCheckCircle,MdCircle} from 'react-icons/md';
import { useStateValue } from '../context/StateProvider';
import { saveCollab ,saveFeedback} from '../utils/firebaseFunctions';
import CartContainer from "./CartContainer";

import mobile from "../img/mobile-frame.png"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {motion} from "framer-motion"
import {useInView} from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

import {v4} from 'uuid'

import screen1 from '../img/screen1.png'
import screen2 from '../img/screen2.png'
import screen3 from '../img/screen3.png'

import collage1 from '../img/collage-1.jpg'
import collage2 from '../img/collage-2.jpg'
import collage3 from '../img/collage-3.jpg'
import collage4 from '../img/collage-4.jpg'
import collage5 from '../img/collage-5.jpg'
import collage6 from '../img/collage-6.jpg'

import gear1 from '../img/gear-1.jpg'
import gear2 from '../img/gear-2.png'

import { timeline } from '../utils/data';

import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"
import Animation from './Animation';

gsap.registerPlugin(ScrollTrigger);


const AboutUs = () => {

    useEffect(()=>{
        let mm=gsap.matchMedia()
    mm.add("(min-width: 800px)",()=>{
        /* const t1=gsap.timeline({
            scrollTrigger:{
              trigger:'.animation-start',
              markers:true,
              start:'top middle',
              end:'bottom middle', 
              scrub:true,
              pin:'.animation-start'
            }
          }) */


       /* const tl1=gsap.timeline({
            scrollTrigger:{
              trigger:'.animation-start',
              markers:true,
              start:'top 20%',
              end:'bottom middle',
              scrub:true,
              pin:'.animation-start'
            }
          }) */

        /* t1.to('.play-list1',{
            scale:1.2,
            duration:3,
            
        }).to('.play-list1',{
            scale:1,
            duration:3,
            
        }).to('.play-list2',{
            scale:1.3,
            duration:3,  
            x:30,
          }).to('.play-list2',{
            scale:1,
            duration:3,
            x:-30,
          }).to('.play-list3',{
            scale:1.3,
            duration:3,
            x:30,
          }).to('.play-list3',{
            scale:1,
            duration:3,
            x:-30,
          }).to('.play-list4',{
            scale:1.3,
            duration:3,
            x:30,
          }).to('.play-list4',{
            scale:1,
            duration:3,
            x:-30,
          }).to('.play-list5',{
            scale:1.3,
            duration:3,
            x:30,
          }).to('.play-list5',{
            scale:1,
            duration:3,
            x:-30,
          })  */

         /*  tl1.to('play-mobile',{
            scale:1.4,
            duration:4.5,
            x:-20,
          }).to('.play-mobile-screen1',{
            opacity:0,
            duration:3,
            delay:0.5,
          }).to('.play-mobile-screen2',{
            opacity:1,
            duration:4.5, 
            delay:0.5, 
          }).to('.play-mobile-screen2',{
            opacity:0,
            duration:1.5,
            delay:0.5
          }).to('.play-mobile-screen3',{
            opacity:1,
            duration:6,
            delay:0.5,  
          }).to('.play-mobile-screen3',{
            opacity:0,
            duration:1.5,
            delay:0.5,
          }).to('.play-mobile-screen4',{
            opacity:1,
            duration:6, 
            delay:0.5, 
          }).to('.play-mobile-screen4',{
            opacity:0,
            duration:1.5,
            delay:0.5,
          }).to('.play-mobile-screen5',{
            opacity:1,
            duration:6, 
            delay:0.5, 
          }).to('play-mobile',{
            x:20,
            scale:1,
            duration:3,
          }) */


        })
    },[])
    

    const[getFeedback,setGetFeedBack]=useState(false)
    const[getCollab,setGetCollab]=useState(false)

    const [ref,inView]=useInView();
    const [ref2,inView2]=useInView();
    const [ref3,inView3]=useInView();

    const [ref4,inView4]=useInView();
    const [ref5,inView5]=useInView();

    const [ref6,inView6]=useInView();
   
  

    const animation1 =useAnimation();
    const animation2 =useAnimation();
    const animation3 =useAnimation();

    const animation4 =useAnimation();
    const animation5 =useAnimation();
    const animation6 =useAnimation();

    const animation7= useAnimation();

    const animation8= useAnimation();
    const animation9= useAnimation();
    const animation10=useAnimation();
    const animation11=useAnimation();
    const animation12=useAnimation();



    useEffect(()=>{
      if(!inView){
        animation1.start({
          x:'-40vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation2.start({
          x:'120vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation3.start({
          scale:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
      
      if(inView){
        animation1.start({
          x:'35vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.3
          }
        })
        animation2.start({
          x:'30vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.3
          }
        })
        animation3.start({
          scale:1,
          transition:{
            type:'spring',
            duration:2,
            bounce:0
          }
        })
      }
      if(!inView2){
        animation4.start({
          x:'-40vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation5.start({
          x:'120vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation6.start({
          scale:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
      if(inView2){
        animation4.start({
          x:'40vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.3
          }
        })
        animation5.start({
          x:'30vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.3
          }
        })
        animation6.start({
          scale:1,
          transition:{
            type:'spring',
            duration:2,
            bounce:0
          }
        })
      }

      if(!inView3){
        animation7.start({
          scale:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
      if(inView3){
        animation7.start({
          scale:1,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }

      if(!inView4){
        animation8.start({
          x:'-30vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
      if(inView4){
        animation8.start({
          x:'0vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }

      if(!inView5){
        animation9.start({
          x:'40vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
      if(inView5){
        animation9.start({
          x:'0vw',
          y:0,
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }

      if(!inView6){
        animation10.start({
          height:"0vh",
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation11.start({
          height:"0vh",
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation12.start({
          height:"0vh",
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
      if(inView6){
        animation10.start({
          height:"25vh",
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation11.start({
          height:"40vh",
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
        animation12.start({
          height:"50vh",
          transition:{
            type:'spring',
            duration:1,
            bounce:0.2
          }
        })
      }
    })

    const [Fname, setFName]=useState("")
    const [Fphone,setFPhone]=useState("")
    const [Fmail,setFMail]=useState("")
    const [Fmessage,setFMessage]=useState("")
    const [Ftestimonial,setFTestimonial]=useState("")

    const [Cname, setCName]=useState("")
    const [Cphone,setCPhone]=useState("")
    const [Cmail,setCMail]=useState("")
    const [Cmessage,setCMessage]=useState("")

    const [submitted,setSubmitted]=useState(false)

    const [{user,cartShow},dispatch]=useStateValue()

    const submitDataCollab=async()=>{
      try{
        const collab={
          name:Cname,
          phone:Cphone,
          mail:Cmail,
          message:Cmessage,
          id:v4(),
          date:Date.now()
      }

        await saveCollab(collab)

        setCMail("")
        setCPhone("")
        setCName("")
        setCMessage("")

        setSubmitted(true)

        setTimeout(() => {
            setGetCollab(false)
            setSubmitted(false)
          }, 2500);
        } catch(e){
          console.log(e)
        }
        

    }

    const submitDataFeedback=async()=>{

      try{
        const fb={
          name:Fname,
          phone:Fphone,
          mail:Fmail,
          message:Fmessage,
          testimonial:Ftestimonial,
          id:v4(),
          date:Date.now()
      }

        await saveFeedback(fb)

        setFMail("")
        setFPhone("")
        setFName("")
        setFMessage("")
        setFTestimonial("")

        setSubmitted(true)
        console.log(1)
        setTimeout(() => {
            console.log(3)
            setSubmitted(false)
            setGetFeedBack(false)
        }, 2500);

      } catch(e){
        console.log(e)
      }
      
      

     

  }

    

  return (
    <>
    <div className='w-screen h-[870vh] sm:h-[800vh] md:h-[870vh] bg-fooxtBlack'>
        {/* what we do */}
        <div className='md:h-[80vh] h-[90vh] bg-fooxtYellow flex ' >
            <div className='md:w-[50vw] w-[100vw] h-full bg-fooxtYellow flex flex-col justify-around p-16'>
            <motion.div className='w-[60vw] md:w-[30vw] bg-fooxtYellow h-[10vh] text-3xl md:text-6xl font-bold text-fooxtBlack' animate={animation8}> 
                what we do
            </motion.div>
              <motion.div className='md:w-[50vw] w-[80vw] md:my-5 mx-auto text-sm sm:text-base' ref={ref4} animate={animation8}>
              We aim to introduce a decentralised kitchen model in the food industry, with our own network of home and commercial cloud kitchens. This network would be regulated and trained by our team of experts to deliver personalised meals at your doorsteps.  An elaborate machine learning model is being built to provide you meals that consider not just your taste preferences, but also your medical histories and health goals. Innovative technologies are being used to ensure hygiene and exercise regulation over our partner kitchens. <br></br><br></br>
  We hope to provide world class service to all our customers by investing heavily into unique unboxing experiences and by introducing the concept of Do-It-Yourself (DIY) meals.  We are driven by a conservationist attitude, pushing us to explore biodegradable and environment-friendly packaging options for the upcoming iterations.

              </motion.div>
            </div>
            <div className='w-[50vw] h-full hidden md:block'>
                  <motion.img 
                  className="w-[70vh] h-[60vh] mx-[15vh] my-[10vh]" 
                  animate={{rotate:[0,360]}}
                  transition={{ duration: 2, repeat: Infinity }}
                  src={gear1}/>
                  <motion.img 
                  className="w-[45vh] h-[35vh] mx-[50vh] -my-[72vh] z-2 " 
                  animate={{rotate:[360,0]}}
                  transition={{ duration: 2, repeat: Infinity }}
                  src={gear1}/>
                  
            </div>
            
        </div>

        {/* our vision */}
        <div className='md:h-[80vh] h-[90vh] bg-white flex flex-row ' >
          <div className='w-[40vw] h-full hidden md:block'>
            <div className='w-[40vw] h-[70%] flex justify-center my-[15%] items-end  '>
              <motion.div className='w-[2vw] h-[20vh] bg-fooxtYellow mx-10 border-2 border-fooxtBlack' animate={animation10}>

              </motion.div>
              <motion.div className='w-[2vw] h-[20vh] bg-fooxtYellow mx-10 border-2 border-fooxtBlack' animate={animation11}>

              </motion.div>
              <motion.div className='w-[2vw] h-[20vh] bg-fooxtYellow mx-10 border-2 border-fooxtBlack' animate={animation12}>

              </motion.div>
            </div>
          </div>
            <div className='w-[80vw] md:w-[50vw] h-full bg-white flex flex-col justify-around p-16 '>
            <motion.div className='w-[60vw] md:w-[30vw] bg-white h-[10vh] text-3xl md:text-6xl font-bold text-fooxtBlack' animate={animation9} ref={ref6}> 
                our vision
            </motion.div>
            <motion.div className='w-[80vw] md:w-[50vw] p-2 text-sm sm:text-base' ref={ref5} animate={animation9}>
            A cornerstone to the vision of Fooxt is its community platform, where members could engage in discussions, share their creations, participate in challenges and trends, maintain streaks and enjoy some new, unique features that we hope to introduce for the benefit of our users.<br></br><br></br>
We are driven by the impact we hope to make through our endeavours such as providing employment to at least 600 home makers in the next few years, or delving into therapeutic and reversal nutrition in our subsequent projects, among other things. We are constantly striving to make personalised meals affordable for the masses by an extensive optimisation of our supply chain.<br></br><br></br>
<span ref={ref6}>The vision for Fooxt converges with the ideas of sustainable and cohesive progress towards a healthier, happier world. </span>

            </motion.div>
            </div>
            
        </div>

        {/*  our journey */}

        <Animation/>

        <div className='h-[265vh] xsm:h-[230vh] md:h-[230vh] sm:h-[175vh]  bg-fooxtBlack'>
            <div className='w-[60vw] md:w-[30vw] text-fooxtYellow md:h-[30vh] h-[10vh] text-3xl md:text-6xl font-bold bg-fooxtBlack py-8 mx-auto md:py-16'> 
                our journey
            </div>
            <VerticalTimeline>
                
                {
                    timeline.map(el=>{
                        let col=''
                        let icon=null
                        if(el.status=="done"){
                            col='#06D6A0'
                           /*  icon=<MdCheckCircle></MdCheckCircle> */
                        }
                        else if(el.status=="current"){
                          col='white'
                          icon=<MdCircle className='text-red-400'/>
                        
                      }
                        else{
                            col='#f9c74f'
                        }

                        return (
                            <VerticalTimelineElement
                                key={el.id}
                                date={el.date}
                                dateClassName='text-white '
                                
                                iconStyle={{background:col}}
                                icon={icon}
                            >  
                                <p className='sm:text-lg'>
                                    {el.desc}
                                </p>

                            </VerticalTimelineElement>
                        )
                    })
                }
            </VerticalTimeline>
        </div>

        

        {/* feedback */}
        <div className={`sm:h-[100vh] h-[110vh] bg-fooxtYellow z-2`} >
          {getFeedback?(
          <div className='pt-[10vh]'>
            <motion.div      
        className="md:h-[60vh] md:w-[100vw] w-[90vw] h-[50vh]  z-2  rounded-lg  px-4  backdrop-blur-lg hover:drop-shadow-lg flex flex-col justify-evenly absolute  my-10"
        initial={{ scale: 0.6 }}
        animate={{scale:1}}
        transition={{ type: "spring", stiffness: 200 }}
        >
           <div className="-my-[6vh] z-10">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-10 h-10 rounded-full bg-fooxtYellow flex items-center justify-center cursor-pointer hover:shadow-md  text-white mx-[10vw] "
              onClick={() => {
                setGetFeedBack(false)
        
                }}
            >
              <MdCancel className="text-fooxtBlack w-5 h-5"/>
            </motion.div>
          
           
            </div>
          
          

          <div className='w-[90vw] md:w-[80%] h-auto min-h-[80vh] m-auto bg-fooxtBlack flex flex-col justify-around  '>
            {submitted?
            (<>
              <div className='text-xl m-auto text-white'>Thank you for submitting. We will take your inputs seriously</div>
            </>):
            (<>
              <div className='wauto h-auto bg-fooxtYellow mx-auto text-center rounded-lg p-2'>
                        FEEDBACK               
                    </div>

                    <div className="w-[70%] py-2 border-b border-fooxtYellow flex justify-center items-center gap-2 mx-auto">
                        <MdAccountCircle className="text-xl text-fooxtYellow" />
                        <input
                            type="text"
                            required
                            value={Fname}
                            onChange={(e) => {
                                setFName(e.target.value)
                            }}
                            placeholder="Name"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
                        />
                    </div>

                    <div className="w-[70%] py-2 border-b border-fooxtYellow flex justify-center items-center gap-2 mx-auto">
                        <MdCall className="text-xl text-fooxtYellow" />
                            <input
                                type="text"
                                required
                                value={Fphone}
                                onChange={(e) => {
                                    setFPhone(e.target.value)
                                }}
                                placeholder="Phone Number"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
                            />
                    </div>

                    <div className="w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdEmail className="text-xl text-fooxtYellow" />
                            <input
                                type="text"
                                required
                                value={Fmail}
                                onChange={(e) => {
                                    setFMail(e.target.value)
                                }}
                                placeholder="Email"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-white text-white"
                            />
                    </div>

                    <div className="w-[70%] h-auto min-h-28 py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdEmail className="text-xl text-fooxtYellow" />
                            <input
                                type="textarea"
                                rows="3" cols="10"
                                required
                                value={Fmessage}
                                onChange={(e) => {
                                    setFMessage(e.target.value)
                                }}
                                placeholder="Message"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-white text-white"
                            />
                    </div>
                    <div className="w-[70%] h-auto min-h-28 py-2  flex justify-center items-center gap-2 mx-auto text-white">
                       <h3 className='w-[75%] text-base'>Will you be willing to shoot a testimonal video for us? Will help us a lot !!</h3>
                          <input
                                type="checkbox"
                                
                                required
                                value={Ftestimonial}
                                onChange={(e) => {
                                    console.log(e)
                                    setFTestimonial(e.target.value)
                                }}
                                placeholder="Message"
                                className="w-[25%] h-full text-lg bg-transparent outline-none border-2 placeholder:text-white text-white"
                            />
                    </div>

                    <button
                    type="button"
                    className="my-[2vh] mx-auto  w-auto  border-none outline-none bg-fooxtYellow  p-2 rounded-lg text-lg text-fooxtBlack font-semibold"
                    onClick={()=>{
                        submitDataFeedback()
                    }}
                    >
                    SUBMIT
                    </button>
            </>)}
                    
            
            
          </div> 

         {/* <div className="w-full flex flex-col items-end justify-end -mt-8">
           
          
           
         </div> */}
       </motion.div>
          </div>
          ):(
          <>
          <motion.h1 className={`md:text-title sm:text-3xl text-2xl font-semibold pt-[5vh] ${getFeedback?'hidden':''}`} animate={animation1}>our pilot</motion.h1>
          <motion.h1 className={`md:text-title sm:text-3xl text-2xl font-semibold ${getFeedback?'hidden':''}`}  animate={animation2}>programme</motion.h1>

          <div className={`h-[50vh]  w-full flex bg-fooxtYellow `} ref={ref}>
            <motion.div className='h-full w-full bg-fooxtYellow p-10 sm:text-lg text-base flex flex-col text-center' animate={animation3}>
            <p>The idea behind launching a pilot project was to understand the response to the product and the nature of engagement with the brand. It was also to equip the team with the ability to handle logistics on a larger scale, build confidence for future projects and trust with our potential customers and investors.<br></br><br></br>
We are actively seeking customer feedback, to refine the product and operation model. We are consciously making efforts to adjust and improve your experience with our services, and would highly appreciate any suggestions/observations being communicated to us.
            </p>
              <button 
                type="button" 
                className='h-[8vh] md:w-[15vw] w-[30vw] bg-fooxtBlack text-white m-auto text-center rounded-lg mt-[5vh]'
                onClick={()=>{
                 setGetFeedBack(true)
                }}>
                  GIVE FEEDBACK
                </button>
            </motion.div>
            
           </div>
          </>
          )}
          

          
       
        </div>


        {/*  collabs */}
        <div className={`h-[100vh] bg-fooxtBlack text-white`} >
          {getCollab?(
          <div className='pt-[10vh]' >
            <motion.div      
        className="md:h-[60vh] md:w-[100vw] w-[90vw] h-[50vh]  z-2  rounded-lg  px-4  backdrop-blur-lg hover:drop-shadow-lg flex flex-col justify-evenly absolute"
        initial={{ scale: 0.6 }}
        animate={{scale:1}}
        transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="-my-[6vh] z-10 ">
          <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-10 h-10 rounded-full bg-fooxtYellow flex items-center justify-center cursor-pointer hover:shadow-md  text-white mx-[10vw] mt-4 "
              onClick={() => {
                setGetCollab(false)
        
                }}
            >
              <MdCancel className="text-fooxtBlack w-5 h-5"/>
            </motion.div>
          
           
          </div>
          <div className='w-[90%] h-auto min-h-[64vh] m-auto bg-fooxtBlack flex flex-col justify-around '>
                {submitted?
                (<>
                  <div className='text-xl m-auto text-white'>Thank you for submitting. We will get back to you shortly</div>
                </>):
                (<>
                    <div className='w-auto h-auto bg-fooxtYellow mx-auto text-center rounded-lg p-2 text-fooxtBlack'>
                        COLLABORATIONS              
                    </div>

                    <div className="w-[70%] py-2 border-b border-fooxtYellow flex justify-center items-center gap-2 mx-auto">
                        <MdAccountCircle className="text-xl text-fooxtYellow" />
                        <input
                            type="text"
                            required
                            value={Cname}
                            onChange={(e) => {
                                setCName(e.target.value)
                            }}
                            placeholder="Name"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
                        />
                    </div>

                    <div className="w-[70%] py-2 border-b border-fooxtYellow flex justify-center items-center gap-2 mx-auto">
                        <MdCall className="text-xl text-fooxtYellow" />
                            <input
                                type="text"
                                required
                                value={Cphone}
                                onChange={(e) => {
                                    setCPhone(e.target.value)
                                }}
                                placeholder="Phone Number"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
                            />
                    </div>

                    <div className="w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdEmail className="text-xl text-fooxtYellow" />
                            <input
                                type="text"
                                required
                                value={Cmail}
                                onChange={(e) => {
                                    setCMail(e.target.value)
                                }}
                                placeholder="Email"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-white text-white"
                            />
                    </div>

                    <div className="w-[70%] h-auto min-h-28 py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdEmail className="text-xl text-fooxtYellow" />
                            <input
                                type="textarea"
                                rows="3" cols="10"
                                required
                                value={Cmessage}
                                onChange={(e) => {
                                    setCMessage(e.target.value)
                                }}
                                placeholder="Message"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-white text-white"
                            />
                    </div>
                   

                    <button
                    type="button"
                    className="my-[2vh] mx-auto  w-auto  border-none outline-none bg-fooxtYellow  p-2 rounded-lg text-lg text-fooxtBlack font-semibold"
                    onClick={()=>{
                        submitDataCollab()
                    }}
                    >
                    SUBMIT
                    </button>
                </>)}
                    
            
            
                  </div> 

         
       </motion.div>
          </div>
          ):(
          <>
          <motion.h1 className={`md:text-title sm:text-3xl text-2xl font-semibold pt-[5vh] ${getCollab?'hidden':''}`} animate={animation4}>talent</motion.h1>
          <motion.h1 className={`md:text-title sm:text-3xl text-2xl font-semibold  ${getCollab?'hidden':''}`}  animate={animation5}>community</motion.h1>

          <div className={`md:h-[50vh] w-full flex bg-fooxtBlack`} ref={ref2} >
            <motion.div className='h-full w-full bg-fooxtBlack p-10 sm:text-xl text-base flex flex-col justify-around text-center' animate={animation6}>
              <p>
              If you resonate with our ideology and feel you can contribute in realising the vision of Fooxt, do reach out to us! We are keen about expanding our team by welcoming talent from diverse domains, and open to exploring possibilities of collaborations/associations. <br></br><br></br>
We are a motivated team that appreciates a flexible work culture targeted at personal growth and satisfaction. As a part of our talent community you would be given access to job/ collaboration opportunities, industry insights, professional networking and career development resources.


              </p>

            <button 
                type="button" 
                className='h-[8vh] md:w-[15vw] w-[30vw] bg-fooxtYellow text-fooxtBlack text-center  m-auto mt-5 rounded-lg mt-full'
                onClick={()=>{
                 setGetCollab(true)
                }}>
                  WORK WITH US
                </button>
            </motion.div>
            
            
           </div>
          </>
          )}
            
        </div> 

       {/*  life at fooxt */}
        <div className='md:h-[120vh] h-[80vh] bg-fooxtYellow flex flex-col justify-center items-center'>
          <div className='bg-fooxtYellow h-[10vh] sm:text-6xl text-4xl font-bold text-fooxtBlack'>
            life at Fooxt
          </div>

          <div class="grid grid-cols-3 grid-rows-4 gap-4 md:w-[60vw] w-[90vw] my-5">
            <motion.div class="row-span-2 col-span-2 bg-blue-100" animate={animation7} >
              <img src={collage2} className='w-full h-full'></img>
            </motion.div>
            <motion.div class="row-span-1 col-span-1 bg-green-100" animate={animation7} >
            <img src={collage1} className='w-full h-full'></img>
            </motion.div>
            <motion.div class="row-span-1 col-span-1 bg-red-100"  animate={animation7} ref={ref3}>
              <img src={collage4} className='w-full h-full'></img>
            </motion.div>
            <motion.div class="row-span-1 col-span-1 bg-yellow-100" animate={animation7} >
            <img src={collage3} className='w-full h-full'></img>
            </motion.div>
            <motion.div class="row-span-2 col-span-2 bg-green-400" animate={animation7} >
              <img src={collage5} className='w-full h-full'></img>
            </motion.div>
            <motion.div class="row-span-1 col-span-1 bg-green-100" animate={animation7} >
            <img src={collage6} className='w-full h-full'></img>
            </motion.div>
          </div>
        </div>

    </div>
    

    
    {cartShow && <CartContainer />}
    </>
  )
}

export default AboutUs