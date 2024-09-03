import React,{useEffect, useState} from 'react'
import { getUsernames, signUpUserData } from '../services/apiServices';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [usernames,setUsernames] = useState()
    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };
    useEffect(() => {
        const fetchUsernames = async () => {
            const fetchedUsernames = await getUsernames();
            setUsernames(fetchedUsernames);
        };

        fetchUsernames();
    }, []);
    const handleUsername = async(event)=>{
        let username=event.target.value.toLowerCase()

        if (username.indexOf(' ')!==-1){
            setUsernameMessage('Space Not allowed')
            
        }
        else if(username===''){
            setUsernameMessage('')
        }
        else{
            setUsernameMessage(((usernames.has(username)) ? 'Username Already Taken' : (/^[a-zA-Z0-9@._-]{3,20}$/.test(username) ?'Username is Valid':'Username is Invalid'))) 
        }
    }
    const handleSignupSubmit = async(event) => {
        event.preventDefault();
        let username=event.target.username.value.trim()
        let email=event.target.email.value.trim()
        let firstname=event.target.firstname.value.trim()
        let lastname=event.target.lastname.value.trim()
        let password=event.target.password.value.trim()
        let usernameValid = false
        let passwordValid = false
        let firstnameValid = false
        let lastnameValid = false
        let emailValid = false
        if (usernameMessage === 'Username is Valid'){
            usernameValid=true
        }
        if( password.length>=8 && password.length<=16){
            if (/[A-Z]/.test(password)){
                if (/[a-z]/.test(password)){
                    if (/[0-9]/.test(password)){
                        if(/[@#$]/.test(password)){
                            passwordValid=true
                        }
                    }
                }
            }
        }
        if (/^[A-Za-z]+$/.test(firstname)){
            firstnameValid=true
        }
        if (/^[A-Za-z]+$/.test(lastname)){
            lastnameValid=true
        }
        if (/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$/.test(email)){
            emailValid=true
        }
        let validData = false
        if (usernameValid && passwordValid && firstnameValid && lastnameValid && emailValid ){
            validData=true
        }

        if (validData){
            let response=await signUpUserData({
                'username':username,
                'email':email,
                'firstname':firstname,
                'lastname':lastname,
                'password':password
            })
    
            if (response.status===200){
                localStorage.setItem('access_token', response.data.access);
                window.location.href='/'
            }
        }
        else{
            if (!passwordValid){
                event.target.password.value = ''
            }
            if (!usernameValid){
                event.target.username.value = ''
            }
            if (!firstnameValid){
                event.target.firstname.value = ''
            }
            if (!lastnameValid){
                event.target.lastname.value = ''
            }
            if (!emailValid){
                event.target.email.value = ''
            }
            alert('Invalid Credentials')
        }
        
    };
    return (
        <div>
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 pt-3 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Create Your New Account
            </h2>
            <form method="post" onSubmit={handleSignupSubmit}>
            <div className="mb-5 block md:flex md:gap-2">
                <div>
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900" >
                    First Name
                    </label>
                    <input type="text" id="firstname" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5" placeholder="John" required />

                </div>
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900" >
                    Last Name
                    </label>
                    <input type="text" id="lastname" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5" placeholder="Doe" required />

                </div>
            </div>
            <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900" >
             username
            </label>
            <input type="text" id="username" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="johndoe123" onChange={handleUsername} required />
            <p className={`text-sm font-medium ${((usernameMessage==='Username is Valid') ? ' text-green-400' : 'text-red-400')} `}>{usernameMessage}</p>
          </div>
            <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900" >
              Your email
            </label>
            <input type="email" id="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@swiftbids.com" required />
          </div>
            <div className="mb-5 relative" >
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900" >
                Your password
                </label>
                <input type={passwordVisible ? "text" : "password"} id="password" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10" required />
                <i onClick={togglePasswordVisibility} data-tooltip-target="tooltip-default" className={`absolute top-10 right-3 text-gray-500 cursor-pointer ${ passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"}`}></i>
                <p className="text-gray-700 text-sm">
                    <span className="font-bold">•</span> At least 8 characters,At most 16 characters, includes one uppercase letter, one number, and one special character from @, #, $.
                </p>

            </div>
            <div className="flex items-center mb-5">
                <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300" checked={termsAccepted} onChange={handleTermsChange} />
                <label
                htmlFor="terms"
                className="ms-2 text-sm font-medium text-gray-900"
                >
                I accept the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                </a>
                </label>
            </div>
            <button
                type="submit"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                !termsAccepted ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!termsAccepted}
            >
                Submit
            </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
                Login
            </a>
            </p>
        </div>
        </div>
        </div>
    )
}

export default Signup
