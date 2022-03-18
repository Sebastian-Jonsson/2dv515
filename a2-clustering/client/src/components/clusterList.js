import { useState } from "react"


function ClusterList({cluster}) {
    const [hiddenFiles, setHiddenFiles] = useState(true)

    const handleFiles = () => {
        setHiddenFiles(!hiddenFiles)
    }

    return (
        <div class="cluster-table">
            <div class="container">

                <label> {cluster.Cluster} </label>
                <div class="folder_tab" onClick={handleFiles}></div>
                <div class="folder" onClick={handleFiles}>{!hiddenFiles && cluster.Assignments.length}</div>
                {hiddenFiles && cluster.Assignments.map(assignment => (
                    <div class="file" key={assignment}>{assignment}</div>
                ))}
            </div>
        </div>
    )
}

export default ClusterList