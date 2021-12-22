const initState = [
  {
    id: "1",
    task: "Learn Redux",
    status: "pendding"
  }
]

const todos = (state = initState, action) => {
  switch(action.type) {
    case "ADD" :
      return {
        state,
        todos: [...state, action.payload]
      }
    
    case "DELETE" :
      const filtered = state.slice(state.indexOf(action.payload),1)
      return {
        state,
        todos: filtered
      }

    default: return state
  }
}

export default todos;