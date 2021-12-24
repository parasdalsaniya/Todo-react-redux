const initState = [
  {
    id: 1,
    task: "Learn Redux",
    status: "Pendding"
  }
]

const todos = (state = initState, action) => {
  switch(action.type) {
    case "ADD" :
      return [...state, action.payload]
    
    case "DELETE" :
      const filtered = state.filter(todo => todo.id !== action.payload.id)
      return filtered

    case "UPDATE" :
      const index = state.findIndex(todo => todo.id !== action.payload);
      const updated = [...state]
      updated[index] = action.payload
      console.log(updated[index])
      return updated

    default: return state
  }
}

export default todos;