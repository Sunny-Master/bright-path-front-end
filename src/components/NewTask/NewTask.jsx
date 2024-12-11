// npm modules
import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Checkbox from '@mui/material/Checkbox';

// css
import styles from './NewTask.module.css'

const NewTask = (props) => {
  const [date, setDate] = useState(dayjs)
  const [formData, setFormData] = useState({ 
    title: '',
    description: '',
    dueDate: new Date(),
    completed: false,
  })

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData({...formData, [name]: value, appliedDate: date, completed: evt.target.checked})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddTask(formData)
    setFormData({ 
      title: '',
      description: '',
      dueDate: new Date(),
      completed: false,
    })
  }

  return (  
    <>
      <h4>Add Job Task</h4>
      <Box
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{ width: "90%" }}
      >
        <Paper elevation={4} sx={{ width: "100%", p: "1rem" }}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              autoComplete="off"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                label="Due Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
            <div>
              <Checkbox
                checked={formData.completed}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <label>Task Completed</label>
            </div>
            <Button type="submit"> Submit </Button>
          </form>
        </Paper>
      </Box>
    </>
  )
}

export default NewTask;