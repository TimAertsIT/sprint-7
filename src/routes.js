import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './home.js';
import App from './App.js';


const Router = () => (
    <BrowserRouter>
        <Routes>  
            <Route index element={<Home/>} /> 
            <Route path="/app/:amountLanguages?/:amountPages?/:amountWebPage?/:amountSeo?/:amountGoogle?/:totalPrice?/:nomPressupost?/:nomClient?" element={<App/>} />  
            <Route path="*" element={<div>404</div> } />
        </Routes>
    </BrowserRouter>
);

export default Router;