import { Link } from "react-router-dom"
import supabase from "../config/supabseClient"

const SmoothieCard = ({ smoothie, onDelete }) => {

    const handleDelete = async () => {
        const { data } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)

        onDelete(smoothie.id)
    }

    //Add onclick function to the smoothie-card to enlarge the card and display the instructions
    return (
        <div className="smoothie-card">

            <h3>{smoothie.title}</h3>
            <h5>Ingredients</h5>
            <ul>{smoothie.ingredients.split("\n").map(p => <li>{p}</li>)}</ul>
            <div className="rating">{smoothie.rating}</div>
            <div className="button">
                <Link to={`/update/${smoothie.id}`}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>

                <Link className="full-method-link" to={`/smoothie/${smoothie.id}`}>
                    <div className="view-menu-btn">View Instructions</div>
                </Link>
            </div>

        </div>
    )
}
export default SmoothieCard

