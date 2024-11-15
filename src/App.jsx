// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewJob from './pages/NewJob/NewJob'
import JobDetails from './pages/JobDetails/JobDetails'
import EditJob from './pages/EditJob/EditJob'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as jobService from './services/jobService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = await jobService.index()
      setJobs(jobsData)
    }
    if (user) fetchJobs()
  }, [user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddJob = async (jobFormData) => {
    const newJob = await jobService.create(jobFormData)
    setJobs([newJob, ...jobs])
    navigate('/dashboard')
  }

  const handleUpdateJob = async (jobFormData) => {
    const updatedJob = await jobService.update(jobFormData)
    setJobs(jobs.map(job => job._id === updatedJob._id ? 
      updatedJob : job
    ))
    navigate(`/jobs/${updatedJob._id}`)
  }

  const handleDeleteJob = async (jobId) => {
    const deletedJob = await jobService.delete(jobId)
    setJobs(jobs.filter(job => job._id !==deletedJob._id))
    navigate('/dashboard')
  }



  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard jobs={jobs}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute user={user}>
              <NewJob handleAddJob={handleAddJob}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <ProtectedRoute user={user}>
              <JobDetails
                user={user}
                handleDeleteJob={handleDeleteJob}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/edit"
          element={
            <ProtectedRoute user={user}>
              <EditJob handleUpdateJob={handleUpdateJob}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
