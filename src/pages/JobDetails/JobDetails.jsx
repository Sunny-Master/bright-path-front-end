// npm modules
import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'

// services
import * as jobService from '../../services/jobService'

// components
import NewTask from '../../components/NewTask/NewTask'
import TaskCard from '../../components/TaskCard/TaskCard'

// css
import styles from './JobDetails.module.css'

// import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

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

  const handleAddTask = async (taskFormData) => {
    // make an API call using service function
    const newTask = await jobService.createTask(jobId, taskFormData)
    // set state with the result
    setJob({ ...job, tasks: [...job.tasks, newTask]})
  }

  if (!job) return <h1>Loading...</h1>
  const date = new Date(job.appliedDate).toLocaleDateString()
  return (  
    <main className={styles.container}>
      <div className={styles.top}>
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
          <div className={styles.actions}>
            <NavLink to='/job/edit' state={job}>
              <EditNoteIcon fontSize="inherit" style={{ color: "limegreen" }}/>
            </NavLink>
            <button onClick={() => props.handleDeleteJob(job._id)}>
              <DeleteIcon fontSize="inherit"/>
            </button>
          </div>
        </section>
        <section>
          <NewTask handleAddTask={handleAddTask}/>
        </section>
      </div>
      
      <div className={styles.taskBoard}>
        {job.tasks.map(task =>
            <TaskCard key={task._id} task={task}/>
        )}
      </div>
    </main>
  )
}

export default JobDetails