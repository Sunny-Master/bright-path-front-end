// npm modules
import { useState } from "react"
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

//css 
import styles from './NewJob.module.css'

const NewJob = (props) => {
  const [date, setDate] = useState(dayjs)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    appliedDate: new Date(),
    appliedFrom: '',
    docLink: '',
    notes: '',
  })

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddJob(formData)
  }

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData({...formData, [name]: value, appliedDate: date})
  }

  return (  
    <main className={styles.container}>
      <h1>New Job Entry</h1>
      <Box
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{ width: "50%" }}
      >
        <Paper elevation={4} sx={{ width: "100%", p: "1rem" }}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              autoComplete="off"
              fullWidth
            />
            <Select
              value={formData.status}
              name="status"
              label="Status"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="Offer">Offer</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                label="Application Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
            <TextField
              label="Job Applied from (website)"
              name="appliedFrom"
              value={formData.appliedFrom}
              onChange={handleChange}
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Docs Link"
              name="docLink"
              value={formData.docLink}
              onChange={handleChange}
              required
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              autoComplete="off"
              fullWidth
            />
            <Button type="submit"> Submit </Button>
          </form>
        </Paper>
      </Box>
    </main>
  )
}

export default NewJob