import { Link } from 'react-router-dom';


export const Home = () => <div>
    <h3>On this website you can calculate the budget for web services.</h3>
    <p>Click on the App link to start calculating</p>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/app">App</Link></li>
        <li><Link to="/ajksdfkjhasdk">Error en la url</Link></li>
    </ul>
</div>

export default Home;