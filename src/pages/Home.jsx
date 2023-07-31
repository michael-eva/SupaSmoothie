import supabase from '../config/supabseClient'
import { useEffect, useState } from 'react'

// components
import SmoothieCard from '../components/SmoothieCard'
import LargeCard from './LargeCard'


const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const trueOrFalse = orderBy === 'title' && true

      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: trueOrFalse })

      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()


  }, [orderBy])

  // map through smoothies here so that we don't need to run 2 map functions in the return
  // console.log(smoothies[0].title);


  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        < div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button
              className={orderBy === 'created_at' ? "focus" : "button"}
              onClick={() => setOrderBy('created_at')}>Time Created
            </button>
            <button
              className={orderBy === 'title' ? "focus" : "button"}
              onClick={() => setOrderBy('title')}>Title
            </button>
            <button
              className={orderBy === 'rating' ? "focus" : "button"}
              onClick={() => setOrderBy('rating')}>Rating
            </button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )
      }

    </div >
  )
}

export default Home