import React from "react"
import useAnimeFetch from "./useAnimeFetch"

function App() {
  const [filter, setFilter] = React.useState("bypopularity");
  const [page, setPage] = React.useState(1);

  const { loading, error, anime, hasMore } = useAnimeFetch(filter, page);

  const observer = React.useRef<any>();

  // const lastElement = React.useCallback((node: any) => {
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver((entries) => {
  //     const isIntersecting = entries[0].isIntersecting;
  //     if (isIntersecting && hasMore) {
  //       setPage(prev => prev + 1);
  //     }
  //     console.log(entries);
  //   }, { threshold: 1 });
  //   if (node) observer.current.observe(node)
  // }, [hasMore, loading]);

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
  }, [])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-20 grid grid-cols-4 gap-6">
        {anime.map((item, key) => {
          return (
            <div key={key} ref={anime.length - 1 === key ? lastElement : null}>
              <div className="w-full aspect-[2/3]">
                <img src={item.images.jpg.large_image_url} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </div>
          )
          // if (anime.length === key + 1) {
          //   return (
          //     <div key={key} ref={lastElement}>
          //       <div className="w-full aspect-[2/3]">
          //         <img src={item.images.jpg.large_image_url} alt={item.title} className="w-full h-full object-cover" />
          //       </div>
          //     </div>
          //   )
          // } else {
          //   return (
          //     <div key={key}>
          //       <div className="w-full aspect-[2/3]">
          //         <img src={item.images.jpg.large_image_url} alt={item.title} className="w-full h-full object-cover" />
          //       </div>
          //     </div>
          //   )
          // }
        }
        )}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
    </div>
  )
}

export default App
