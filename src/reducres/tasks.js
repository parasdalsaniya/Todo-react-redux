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
      console.log(action)
      return [...state, action.payload]
    
    case "DELETE" :
      const filtered = state.slice(state.indexOf(action.payload),1)
      return filtered

    default: return state
  }
}

export default todos;