import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { callbackify } from "util";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume.io" },
    { name: "description", content: "Smart Feedback for your dream job!!" },
  ];
}

export default function Home() {

    const {auth, kv} = usePuterStore();
    const navigate = useNavigate();
    const [resumes,setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);


    useEffect(() => {
        if(!auth.isAuthenticated) navigate(`/auth?next=/`);
    }, [auth.isAuthenticated]);

useEffect (() =>{
  const loadingResumes = async() =>{
    setLoadingResumes(true);

    const resumes = (await kv.list('resume:*',true)) as KVItem [];

    const parsedResumes= resumes?.map((resume) =>(
      JSON.parse(resume.value) as Resume
    ));

    console.log("Parsed Resumes", parsedResumes)
    setResumes(parsedResumes || []);
    setLoadingResumes(false);
  }
})

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
<section className="main-section">
  <div className="page-heading py-16">
<h1> Track Your Applications & Resume Ratings!</h1>
{!loadingResumes && resumes?.length ===0 ? (
  <h2>No resume Found. Upload resume to get feeback!</h2>
):(
<h2>Resume your submissions and check AI-powered Feedback</h2>
)}

  </div>
{loadingResumes &&(
  <div className="flex flex-col items-center justofy-center">
    <img src="/images/resume-scan-2.gif" className="w-[200px]"/>
  </div>
)}


 {/* *map over an array that contains different typoes of resume */}
 
{resumes.length > 0 &&(
<div className="resumes-section">

{!loadingResumes && resumes.map((resume) =>(
<ResumeCard key={resume.id} resume = {resume}/>
)
 
)}
</div>
)}

{!loadingResumes && resumes?.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-10 gap-4">
<Link  to ="/upload" className="primary-button w-fit text-xl font-semibold">
Upload Resume</Link>
  </div>
) }
</section>



  </main>;
}
