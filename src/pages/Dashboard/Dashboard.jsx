//npm modules
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"


// components
import JobCard from "../../components/JobCard/JobCard"

//css
import styles from './Dashboard.module.css'

const Dashboard = ({jobs}) => {

  if (!jobs) return <h1>Loading...</h1>

  return ( 
    <main className={styles.container}>
      {jobs.map(job => 
        <JobCard key={job._id} job={job} />
      )}
    </main>
  )
}

export default Dashboard;