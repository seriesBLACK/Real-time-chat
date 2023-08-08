import { Link } from "react-router-dom"
import "../css files/header.css"
export default function Header() {
    return (
        <header>
            <Link to='/'>

                <h1 style={{ textAlign: 'center' }}>Chat app</h1>
            </Link>
        </header>

    )
}
