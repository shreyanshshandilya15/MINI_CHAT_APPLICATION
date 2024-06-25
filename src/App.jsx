import Message from './Message.jsx';
import './App.css';
import {GoogleAuthProvider,getAuth,signInWithPopup,onAuthStateChanged, signOut} from "firebase/auth";
import { app } from './firebase.js';
import { useEffect, useRef, useState } from 'react';
import {addDoc,collection,getFirestore, onSnapshot, serverTimestamp,query,orderBy} from "firebase/firestore";

const auth=getAuth(app);
const db=getFirestore(app);

const loginHandler=()=>{
     const provider=new GoogleAuthProvider();
     
     signInWithPopup(auth,provider);
}

const logoutHandler=()=>{
     signOut(auth);
}

function App() {
  const [user,setUser]=useState(false);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);

  const reference=useRef(null);

  const submithandler=async(e)=>{
        e.preventDefault();
        await addDoc(collection(db,"messages"),{
          text:message,
          uid:user.uid,
          photo:user.photoURL,
          createdAt:serverTimestamp()
        })
        setMessage("");
        reference.current.scrollIntoView({behaviour:"smooth"});
  }
  
  useEffect(()=>{
    const q=query(collection(db,"messages"),orderBy("createdAt","asc"));
      const value=onAuthStateChanged(auth,(data)=>{
        setUser(data);
      });
      const unsubscribe=onSnapshot(q,(snap)=>{
        setMessages(snap.docs.map((item)=>{
           const id=item.id;
           return {id,...item.data()};
        }));
      })
      return ()=>{
        value();
        unsubscribe();
      }
  },[]);

  return (
    <div className='bg-yellow-400 max-w-lg m-auto h-[100vh] flex-col relative'>
       {user ? 
         <> <button onClick={logoutHandler} className='bg-red-600 w-full text-white h-8'>Logout</button>
         <div className='w-full flex-col p-2 flex-grow h-[calc(100vh-72px)] overflow-y-auto' style={{'-ms-overflow-style': 'none', 'scrollbar-width': 'none'}}>
           
          {messages.map((item)=>{
            return  <Message key={item.id} text={item.text} photo={item.photo} user={user.uid===item.uid ? "me" : ""}/>
          })};
         
         {/*         
        <Message text={"how i doin?"}/>
        <Message text={"bye bye"} user={"me"} />
        <Message text={"bye bye"} user={"me"} />
        <Message text={"how i doin?"}/> 
        */}
         <div ref={reference}></div>
         </div>
         
          <form onSubmit={submithandler}>
          <div className='flex items-center absolute top-[calc(100vh-40px)] w-full'>
         <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" name="" id="" className='p-2 w-full' placeholder='enter message...'/>
         <button className='bg-blue-500 text-white w-20 p-2'>Send</button>
         </div>
         </form>
         </> 
         : <div className='relative'>
         <button className='w-full bg-gray-500 absolute top-[50vh]' onClick={loginHandler}>Sign in  with google</button>
         </div> }
        </div>
  )
}

export default App;
