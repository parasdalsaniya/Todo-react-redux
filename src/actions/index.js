export const addTask = (data) => {
  return {
    type: "ADD",
    payload: data
  }
}

export const deleteTask = (data) => {
  return {
    type: "DELETE", 
    payload: data
  }
}