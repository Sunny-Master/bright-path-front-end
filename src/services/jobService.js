//services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/jobs`

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function create(jobFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function show(jobId) {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}`, {
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}` 
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function update(jobFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${jobFormData._id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(jobFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deleteJob(jobId) {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  index,
  create,
  show,
  update,
  deleteJob as delete
}