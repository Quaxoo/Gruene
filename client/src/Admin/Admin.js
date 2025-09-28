import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import "./Admin.css"
import AdminTermineList from './Termine/AdminTermineList';
import AdminBeitraegeList from "./Beitraege/AdminBeitraegeList";
import Stats from "./Stats/Stats";

const Admin = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogout() {
        try {
        const res = await fetch(`/api/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            navigate("/login")
        } else {
            setError("Logout fehlgeschlagen");
        }
        } catch {
        setError("Server nicht erreichbar");
        }
    }

    return ( 
        <div className='admin-page'>
            <Stats/>

            <div className="termin-head">
                <h2 className='gruene-font'>Termine</h2>
                <Link className="create-link" to={"/admin/termine/erstellen"}>+</Link>
                <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
            </div>
            
            <AdminTermineList/>

            <div className="beitrag-head">
                <h2 className='gruene-font'>Beiträge</h2>
                <Link className="create-link" to={"/admin/beitraege/erstellen"}>+</Link>
            </div>

            <AdminBeitraegeList/>
        </div>
    );
}
 
export default Admin;