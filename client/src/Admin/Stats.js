import React, { useEffect, useState } from 'react'

const Stats = () => {
    const [stats, setStats] = useState(null)

    const loadStats = async () => {
        try {
        const res = await fetch("/api/stats", {
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            setStats(data);
        }
        } catch {
            
        }
    }

    useEffect( () => {
        loadStats()
    }, [])

    return ( 
        <div>

        </div>
    );
}
 
export default Stats;