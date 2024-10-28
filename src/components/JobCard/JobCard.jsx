// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './JobCard.module.css'

const JobCard = ({ job }) => {
  const date = new Date(job.appliedDate).toLocaleDateString()
  return (
    <NavLink to={`/jobs/${job._id}`} >
      <article className={styles.container}>
        <header>
          <h1>{job.company}</h1>
          <h4>{job.position}</h4>
        </header>
        <section>
          <label>Status: <span>{job.status}</span></label>
          <label>Applied on: <span>{date}</span></label>
          <label className={styles.notes}>Notes: <span >{job.notes}</span></label>
        </section>
      </article>
    </NavLink>
    
  )
}

export default JobCard