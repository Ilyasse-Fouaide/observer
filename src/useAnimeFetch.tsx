import axios from 'axios'
import React from 'react'

export default function useAnimeFetch(filter: string, page: number) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [anime, setAnime] = React.useState<any[]>([]);
  const [hasMore, setHasMore] = React.useState(false);

  React.useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/top/anime?filter=${filter}&page=${page}`)
      .then(({ data }) => {
        setAnime((prev) => [...prev, ...data.data]);
        setHasMore(data.data.lenght > 0)
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      })
  }, [page])

  return { loading, error, anime, hasMore }
}
