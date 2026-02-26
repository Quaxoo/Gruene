import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import "./Stats.css"
import Graph from './Graph';

const Stats = () => {
    const [stats, setStats] = useState(null)
    const [interval, setInterval] = useState(7)

    const loadStats = async () => {
        try {
            const res = await fetch("/api/stats", {
                credentials: "include"
        });
        if (res.ok) {
            const data = await res.json();
            setStats(data)
        }else{
            console.log(res)
        }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadStats()
    }, [interval])

    if(!stats){
        return (<h1>Nope</h1>)
    }

    return ( 
        <div className='stats'>

            <div className='wrapper'>
                <div className='stats-total panel'>
                    {stats.total && <p className='number'>{stats.total}</p>}
                    <p className='visitors'>Besucher</p>
                </div>

                <div className='stats-ranking panel'>
                    <h2>Top Orte</h2>
                    {stats.perCity &&
                        stats.perCity.map(entry => (
                            <div className='entry' key={entry[0]}>
                                <div className='left'>
                                    <p className='city'>{entry[0]}</p>
                                    <span className='bar' style={{width: `${(entry[1]/stats.total) * 100}%`}}/>
                                </div>

                                <p className='number'>{entry[1]}</p>
                                <p className='percent'>{`${((entry[1]/stats.total) * 100).toFixed(1)}%`}</p>
                            </div>
                        ))
                    }
                </div>  
            </div>

            <Graph stats={stats} interval={interval} setInterval={setInterval}/>
        </div>
    );
}
 
export default Stats;