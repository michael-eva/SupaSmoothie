import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import supabase from "../config/supabseClient"




const LargeCard = () => {
    const { id } = useParams()
    const [smoothie, setSmoothie] = useState(null)
    const [errorMessage, setError] = useState(null)

    useEffect(() => {
        const fetchSmoothie = async () => {
            const { data, error } = await supabase
                .from('smoothies')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                setError("Error. Please try again")
            }
            if (data) {
                setSmoothie(data)
            }
        }

        fetchSmoothie()
    }, [id])

    return (

        <div className="individual-smoothie">
            <div className="smoothie-header">{smoothie?.title}</div>
            <h3>Ingredients</h3>
            <ul>{smoothie?.ingredients.split("\n").map(p => <li>{p}</li>)}</ul>
            <h5>Method:</h5>
            <div className="smoothie-instructions">{smoothie?.method}</div>
        </div>

    )
}
export default LargeCard
