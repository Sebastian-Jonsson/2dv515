import { useState } from "react"
import axios from 'axios'


function Dashboard() {
    const [searchParam, setSearchParam] = useState([])
    const [searchList, setSearchList] = useState([])
    const [amountResult, setAmountResult] = useState(5)

    
    const toggleFunction = () => {
        console.log("Query: "+ searchParam)
        setSearchList([])
        axios.get('api/v1/search', {
            params: {
                sentence: searchParam
            }
        })
        .then(resp => {
            console.log('Search results: ')
            console.log(...resp.data)
            setSearchList(list => [...list, ...resp.data])
        })
    }

    const onNewSentence = (e) => {
        setSearchParam(e.target.value) 
    }
    
    const onNewAmount = (e) => {
        setAmountResult(e.target.value) 
    }

    return (
        <div>
            <div id="table">
            <input
            type="text"
            id="header-results"
            placeholder="Amount: 5"
            name="s" 
            onChange={onNewAmount}/>
            </div>

            <input
            type="text"
            id="header-search"
            placeholder="Search"
            name="s" 
            onChange={onNewSentence}/>
            <div id="table">

            <button type="submit" onClick={() => toggleFunction()}>Search</button>
            </div>

            <div>
            <div id="table">
                <table>
                    <th>Link</th>
                    <th>Score</th>
                    <th>Content</th>
                    <th>Location</th>
                    {searchList.slice(0, amountResult).map(data => (
                        <tr key={data.page}>
                            <td><a href={data.page}>{data.page}</a></td>
                            <td>{data.score}</td>
                            <td>{data.content}</td>
                            <td>{data.location}</td>
                        </tr>
                    ))}
                </table>
            </div>
            </div>
        </div>
    )
}


export default Dashboard
