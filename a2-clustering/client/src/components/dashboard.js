import { useState } from "react"
import axios from 'axios'
import ClusterList from './clusterList'


function Dashboard() {
    const [clusterList, setClusterList] = useState([])
    const [selectedClusterType, setSelectedClusterType] = useState()
    const [hiddenFiles, setHiddenFiles] = useState(false)

    
    const toggleFunction = (choice) => {
        if (choice === 'K-Means') {
            setClusterList([])
            if (selectedClusterType === undefined) {
                    console.log('Fill all parameters')
                }
                else {
                    axios.get('api/v1/blogs', {
                        params: {
                            type: selectedClusterType
                        }
                    })
                .then(resp => {
                    console.log('data below: ')
                    console.log(...resp.data)
                    setClusterList(list => [...list, ...resp.data])
                })
                console.log("k-means")
            }
        }
    }

    const onClusterChange = (e) => {
        setSelectedClusterType(e.target.value)
    }
    
    const handleFiles = (e) => {
        console.log(e.target)
        setHiddenFiles(!hiddenFiles)
    }

    return (
        <div class="typewriter">
            
            <label> Cluster Type: </label>
            <select name="clustering" id="cluster-select" onChange = {onClusterChange}>
            <option key='0' value='0'>{'--Select--'}</option>
            <option key='1' value='K-Means'>K-Means</option>
            <option disabled key='2' value='Hierarchical'>Hierarchical</option>
            </select>

            <h3>Choices</h3>
            <input type='button' name='K-Means' value='Cluster Up!' onClick={() => toggleFunction('K-Means')}></input>


            <h3>Clusters</h3>
            <div class="cluster-wrapper">
                {clusterList.map(cluster => (
                    <ClusterList key={cluster.Cluster} cluster={cluster} />   
                ))}
            </div>
            
        </div>
    )
}


export default Dashboard
