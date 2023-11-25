import React from "react"
import useAnimeFetch from "./useAnimeFetch"

function App() {
  const [filter, setFilter] = React.useState("bypopularity");
  const [page, setPage] = React.useState(1);

  const { loading, error, anime, hasMore } = useAnimeFetch(filter, page);

  React.useEffect(() => {
    console.log(loading)
  }, [loading])

  const observer = React.useRef<any>();

  const lastElement = React.useCallback((node: any) => {
    observer.current = new IntersectionObserver((entries, observe) => {
      const isIntersecting = entries[0].isIntersecting
      if (isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
      if (isIntersecting) {
        observe.disconnect();
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [hasMore])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-20 grid grid-cols-4 gap-6">
        {anime.map((item, key) => (
          <div key={key} ref={anime.length - 1 === key ? lastElement : null}>
            <div className="w-full aspect-[2/3]">
              <img src={item.images.jpg.large_image_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
    </div>
  );
}

export default App;