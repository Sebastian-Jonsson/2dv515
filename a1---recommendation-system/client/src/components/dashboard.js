import { useEffect, useState } from "react"
import axios from 'axios'


function Dashboard() {
    const [usersList, setUsersList] = useState([])
    const [recommendationList, setRecommendationList] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [similaritySet, setSimilaritySet] = useState()
    const [amountResults, setAmountResults] = useState()
    
    useEffect(() => {
        axios.get(`api/v1/users`).then(resp => {
            setUsersList((userList) => [...userList, ...resp.data])
        })
    }, [])
    
    const toggleFunction = (choice) => {
        if (choice === 'recommended-movies') {
            setRecommendationList([])
            if (selectedUser === undefined || 
                similaritySet === undefined || 
                amountResults === undefined) {
                    console.log('Fill all parameters')
                }
                else {
                    axios.get('api/v1/tables', {
                        params: {
                            user: selectedUser,
                            similarity: similaritySet,
                            results: amountResults
                        }
                    })
                .then(resp => {
                    console.log('data below: ')
                    console.log(...resp.data)
                    setRecommendationList(tableList => [...tableList, ...resp.data])
                    console.log(recommendationList)
                })
                console.log("movies")
            }
            console.log(recommendationList)
        }
        if (choice === 'top-match-users') {
            console.log('user')
        }
        if (choice === 'item-based') {
            console.log('item-based')
        }
    }

    const onSelected = (e) => {
        setSelectedUser(e.target.value) 
    }

    const onSimilarity = (e) => {
        setSimilaritySet(e.target.value)
    }

    const onResults = (e) => {
        setAmountResults(e.target.value)
    }


    return (
        <div>
            <label>User: </label>
            <select name="users" id="user-select" onChange = {onSelected}>
            <option key='0' value='0'>{'--Select--'}</option>
            {usersList.map(user => 
                <option key={user.UserId} value={user.UserId}>{user.UserId + '. ' + user.Name}</option>
            )}
            </select>

            <label> Similarity: </label>
            <select name="similarity" id="similarity-select" onChange = {onSimilarity}>
            <option key='0' value='0'>{'--Select--'}</option>
            <option key='1' value='euclidean'>Euclidean</option>
            <option key='2' value='pearson'>Pearson</option>
            </select>

            <label>Results: </label>
            <input type="form" onChange = {onResults}></input>

            <h3>Choices</h3>
            <input disabled type='button' name='top-match-users' value='Find top matching users' onClick={() => toggleFunction('top-match-users')}></input>

            <input type='button' name='recommended-movies' value='Find recommended movies' onClick={() => toggleFunction('recommended-movies')}></input>

            <input disabled type='button' name='item-based' value='Find recommendations, item based' onClick={() => toggleFunction('item-based')}></input>
            <h3>Table</h3>

            <div id="table">
                <table>
                    <th>Title</th>
                    <th>ID</th>
                    <th>Score</th>
                    {recommendationList.map(data => (
                        <tr key={data.MovieId}>
                            <td>{data.Title}</td>
                            <td>{data.MovieId}</td>
                            <td>{data.TotalScore}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}


export default Dashboard
