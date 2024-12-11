// css
import styles from "./TaskCard.module.css"

const TaskCard = ({ task }) => {
  if (!task) return <h1>Loading...</h1>
  const date = new Date(task.dueDate).toLocaleDateString()
  return (  
    <div className={styles.card}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Due: &nbsp;{date}</p>
    </div>
  )
}

export default TaskCard