import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !ingredients || !rating) {
      setError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, ingredients, rating })
      .eq('id', id)

    if (error) {
      setError('Please fill in all the fields correctly.')
      return
    }
    if (data) {
      setError(null)
    }
    navigate('/')
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setIngredients(data.ingredients)
        setRating(data.rating)

      }
    }

    fetchSmoothie()
  }, [id, navigate])

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update