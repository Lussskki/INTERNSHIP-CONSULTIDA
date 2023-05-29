export default function BecomeButton({ title }) {
  return (
    <a target="_blank" href="https://dashboard.consultida.com/consultant/login" className="btn btn-primary mr-10 border-none hover:bg-loginHover" rel="noreferrer">
      {title}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 ml-2 stroke-current">  
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>                        
      </svg>
    </a>  
  )
}