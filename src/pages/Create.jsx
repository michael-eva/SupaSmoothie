import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !ingredients || !rating) {
      setError("Please fill in all the fields")
      return
    }

    const { data } = await supabase
      .from("smoothies")
      .insert({ title, ingredients, rating, method })

    setError(null)
    setTitle("")
    setIngredients("")
    setRating("")
    setMethod("")
    navigate('/')
  }
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          className="type"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Ingredients: </label>
        <textarea
          id="ingredients"
          className="type"
          value={ingredients}
          name="ingredients"
          onChange={(e) => setIngredients(e.target.value)}
        />
        <label htmlFor="title">Method: </label>
        <textarea
          id="method"
          className="type"
          value={method}
          name="method"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="title">Rating: </label>
        <input
          id="rating"
          type="number"
          className="type"
          value={rating}
          name="rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create Smoothie Recipe</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Create
