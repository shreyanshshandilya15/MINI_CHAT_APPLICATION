
export default function Message({user,text,photo}) {
  
    
  return (
    <div className={`flex ${user === "me" ? "justify-end" : "justify-start"} w-full`}>
    <div className={`flex gap-2 bg-white m-2 p-2 rounded-lg items-center ${user === "me" ? "self-end" : "self-start"} message`}>
      <img src={photo} alt="err" className="rounded-full h-10 w-10 p-1" />
      <span>{text}</span>
    </div>
  </div>
  )
}