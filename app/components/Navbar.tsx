import type { JSX } from "react";
import { Link } from "react-router";

const Navbar = () => {
    return(
<nav className="Navbar">
<Link to= "/">
<p className="text-2xl font-bold text-gradient">
    Resumeio
</p>
</Link>
<Link to = "/upload" className="primary-button w-fit">
Upload Resume</Link>
</nav>
    );
}

export default Navbar