import React from "react"
import useAnimeFetch from "./useAnimeFetch"

function App() {
  const [filter, setFilter] = React.useState("bypopularity");
  const [page, setPage] = React.useState(1);

  useAnimeFetch(filter, page);

  return (
    <>
      <div>APP</div>
    </>
  )
}

export default App
