import React , {Suspense} from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Landing = React.lazy(()=> import('./pages/Landing')) ;
const Products = React.lazy(()=> import( './pages/Products'));
const About = React.lazy(()=> import('./pages/About') );
const Services = React.lazy(()=> import('./pages/Services') );
const HelpPage = React.lazy(()=> import('./pages/HelpPage')) ;
const Login = React.lazy(()=> import('./components/Login')) ;
const Terms = React.lazy(()=> import('./components/Terms') )
const Signup = React.lazy(()=> import('./components/Signup') );
const Profile = React.lazy(()=> import ( './pages/Profile'));
const InformationForm = React.lazy(()=> import('./components/InformationForm'));

const App = () => {
    return (
        <>
            <Router>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/help" element={<HelpPage />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/profile/edit" element={
                            <Suspense fallback={<></>}>
                                <InformationForm/>    
                            </Suspense>} />
                    </Routes>
                </Suspense>
            </Router>
        
            
        </>
    );
};

export default App;
