import {Link} from 'react-router-dom'

const Nav = () => (
    <nav>
        <ul className="nav nav-tab">
            <li className='nav-item pr-3 pt-3 pb-3'>
                <Link to="/">Pagrindinis</Link>
            </li>
            <li className='nav-item pr-3 pt-3 pb-3'>
                <Link to="/Create">Sukurti</Link>
            </li>
        </ul>
    </nav>
)

export default Nav; 