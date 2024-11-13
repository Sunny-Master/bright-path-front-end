// npm modules
import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'

// services
import * as jobService from '../../services/jobService'

// css
import styles from './JobDetails.module.css'

const JobDetails = (props) => {
  const [job, setJob] = useState(null)
  const { jobId } = useParams()

  useEffect(() =>{
    const fetchJob = async() => {
      const jobData = await jobService.show(jobId)
      setJob(jobData)
    }
    fetchJob()
  }, [jobId])

  if (!job) return <h1>Loading...</h1>
  const date = new Date(job.appliedDate).toLocaleDateString()
  return (  
    <main className={styles.container}>
      <section >
        <div className={styles.header}>
          <h1>{job.position}</h1>
          <h2>{job.company}</h2>
        </div>
        <div className={styles.details}>
          <label>Status: &nbsp;<span>{job.status}</span></label>
          <label>Applied on: &nbsp;<span>{date}</span></label>
          <label>Applied from: &nbsp;<span>{job.appliedFrom}</span></label>
          <label>Docs: &nbsp;<span><a href={job.docLink}>Click here to open</a></span></label>
          <label>Notes: &nbsp;<span>{job.notes}</span></label>
        </div>

      </section>
      <section>
        <h2>Tasks</h2>
        
      </section>
    </main>
  )
}

export default JobDetails