import React, { useEffect, useState } from 'react'
import { line, curveCardinal } from "d3-shape";
import { scaleLinear } from "d3-scale";

const Graph = ({stats, interval, setInterval}) => {
    const [graph, setGraph] = useState(null)
    const [startDateOffset, setStartDateOffset] = useState(0)

    const setGraphStats = () => {
        if(!stats) return
        const perDay = stats.perDay
        setGraph(getLastXDaysData(perDay, interval))
    }

    function getLastXDaysData(obj, days) {
        const result = [];
        const today = new Date()

        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i + startDateOffset);

            const key = formatDateLocal(d);

            result.push([key, obj[key] ?? 0]);
        }

        return result;
    }

    function formatDateLocal(date) {
        return date.toLocaleDateString("de-DE", { 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit" 
        }).replace(/\./g, "-").split("-").reverse().join("-");
    }

    function SmoothLineDate({ data }) {
        const width = 968 - 2*69 + 16;
        const height = 202;
        const padding = 8;

        const points = data.map(d => ({
            x: new Date(d[0]).getTime(),
            y: d[1]
        }));

        const minX = Math.min(...points.map(p => p.x));
        const maxX = Math.max(...points.map(p => p.x));
        const minY = Math.min(...points.map(p => p.y));
        const maxY = Math.max(...points.map(p => p.y));

        const scaleX = scaleLinear().domain([minX, maxX]).range([padding, width - padding]);
        const scaleY = scaleLinear().domain([minY, maxY]).range([height - padding, padding]);

        const lineGenerator = line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))
        .curve(curveCardinal.tension(.7)); // smooth & exakt durch Punkte

        const pathData = lineGenerator(points);

        return (
            <svg width={width} height={height}>
            <path d={pathData} fill="none" stroke="inherits" strokeWidth="2" />
            </svg>
        );
    }

    function backByInterval(){
        setStartDateOffset(startDateOffset - interval)
    }
    function forwardByInterval(){
        if(startDateOffset + interval > 0){
            setStartDateOffset(0)
        }else{
            setStartDateOffset(startDateOffset + interval)   
        }
    }

    function setIntervalWeek(){
        setInterval(7)
    }
    function setIntervalMonth(){
        setInterval(30)
    }


    function Dates({graph}){
        
        useEffect(() => {
            seven()
        }, [graph])

        const seven = () => {
            const dates = []

            if(graph.length === 30){
                dates.push(graph[0][0])
                dates.push(graph[5][0])
                dates.push(graph[10][0])
                dates.push(graph[15][0])
                dates.push(graph[20][0])
                dates.push(graph[25][0])
                dates.push(graph[29][0])

            }else if(graph.length === 7){
                graph.map(d => (
                    dates.push(d[0])
                ))
            }
            console.log(dates)
            return dates
        }

        return (<div className='dates'>
                {seven().map(date => (
                    <p key={date}>{new Date(date).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "short"
                        })}
                    </p>
                ))}
        </div>)
    }


    useEffect(() => {
        setGraphStats()
    }, [startDateOffset, interval])

    if(!graph){
        return <h1>Wait</h1>
    }

    return ( 
        <div className='graph panel'>
            <button className='arrow back' onClick={backByInterval}>{"←"}</button>
            {startDateOffset < 0 && <button className='arrow forward' onClick={forwardByInterval}>{"→"}</button>}

            <div className='interval'>
                <div onClick={setIntervalWeek} className={`week ${interval === 7 ? "active" : ""}`}>Woche</div>
                <div onClick={setIntervalMonth} className={`month ${interval === 30 ? "active" : ""}`}>Monat</div>
            </div>

            <div className='visitors'>
                    <h2>{graph.reduce((acc, data) => acc + data[1], 0)}</h2>
                    <p><span/>Besucher</p>
            </div>

            <div className='time-period'>
                <p>{
                    new Date(graph[0][0]).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "long"
                    })  
                }</p>
                {" - "}
                <p>{
                    new Date(graph[graph.length-1][0]).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "long"
                    })  
                }</p>

                <p>{
                    new Date(graph[graph.length-1][0]).toLocaleDateString("de-DE", {
                        year: "numeric",
                    })  
                }</p>
            </div>
            
            
            <div className='diagram'>

                <SmoothLineDate data={graph}/>

                <div className='hrs'>
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                </div>

                <div className={`hover-points ${interval === 30 ? "monthly" : ""}`}>
                    {graph.map(date => (
                        <div className='hover-point' key={date[0]}>

                            <span className='line'/>
                            
                            <div className='tooltip'>
                                <p className='date'>{new Date(date[0]).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "short"
                                    })}  
                                    {" "}
                                    ({new Date(date[0]).toLocaleDateString("de-DE", {
                                        weekday: "short"
                                    })})
                                </p>

                                <div className='stat'>
                                    <p className='user'>Besucher</p>
                                    <p className='number'>{date[1]}</p>
                                </div>    

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dates graph={graph}/>
        </div>
    );
}
 
export default Graph;