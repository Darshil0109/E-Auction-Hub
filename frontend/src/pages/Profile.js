import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the import according to your file structure
import { isUserAuthenticated } from '../services/apiServices';

const Profile = () => {
  if (!isUserAuthenticated()) {
    console.log("User is not authenticated");
    return <Navigate to="/auth/login" />;
  }

  const handleClick = () => {
    console.log('isUserAuthenticated', isUserAuthenticated());
    localStorage.removeItem('access_token')
  };

  return (
    <>
      <Navbar links={['', 'products', 'services', 'help']} navs={['Home', 'Auctions', 'Services', 'Help']} />
      <a href='/'>
        <button type="button" onClick={handleClick} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'>Log Out</button>
      </a>
    </>
  );
};

export default Profile;
