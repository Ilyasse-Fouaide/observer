import React from "react"
import useAnimeFetch from "./useAnimeFetch"

function App() {
  const [filter, setFilter] = React.useState("bypopularity");
  const [page, setPage] = React.useState(1);

  const { loading, error, anime, hasMore } = useAnimeFetch(filter, page);

  console.log(anime)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-20 grid grid-cols-4 gap-6">
        {anime.map((item, key) =>
          <div key={key}>
            <div className="w-full aspect-[2/3]">
              <img src={item.images.jpg.large_image_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
