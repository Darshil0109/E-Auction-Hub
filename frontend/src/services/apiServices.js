import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const apiToken = process.env.REACT_APP_API_TOKEN;


//method to get Auction Items that are currently active
const fetchAuctionItems = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/',{
            headers: {
                'Authorization': `Token ${apiToken}`  // Include the token in the Authorization header
            }
        });
        // filter auctions that are active 
        const activeitems=await response.data.filter((p)=> {return (p.status==='active' ? true:false)})
        
        
        
        return activeitems; 
    } catch (error) {
        console.error('Error occurred while fetching auction items:', error);
        throw error; 
    }
};

//fetch all categories of auction items can have
const fetchAuctionCategory = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/category/',{
            headers: {
                'Authorization': `Token ${apiToken}`  // Include the token (which is superuser's token) in the Authorization header
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error occurred while fetching Cateogries :', error);
        throw error; 
    }
};

// Get Categoryname by category-id
const getCategoryNameById = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/category/${id}/`,{
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        });
        
        return response.data.category; 

    } catch (error) {
        console.error('Error occurred while getting Cateogry Name :', error);
        throw error; 
    }
};

// function to filter sent by user using filter form the default filter criteria will not affect products list
const handleFilterSubmit = (data,products,categories,updateFilterData) =>{
    try {
        let updatedProducts = [...products];
       
        //filter products by perticular category if user Selected that category
        if (data.categoryselection !== 'None') {
           
            let filtered_category_id = categories.find(filterCategory => filterCategory.category === data.categoryselection).id;
            updatedProducts = updatedProducts.filter(product => product.category === filtered_category_id);
        }

        //filter products between perticular price if user Selected that range
        if (data.rangeofprice !== '-1') {
            let minRange = Number(data.rangeofprice);
            let maxRange = Number(data.rangeofprice) + 500;
            if (maxRange === 10000){
                updatedProducts = updatedProducts.filter(product => product.current_bid >= minRange);
            }
            else{
                updatedProducts = updatedProducts.filter(product => product.current_bid >= minRange && product.current_bid <= maxRange);
            }
           
        }

        //filter products by perticular time if user Selected that time 
        if (data.auctiontimefilter && data.auctiontimefilter !== 'None') {
            
            
            let filteredSeconds = Number(data.auctiontimefilter.split(" ")[0]) * 60 * 60;
            
            updatedProducts = updatedProducts.filter(product => {
                let endTime = new Date(product.end_time).getTime();
                let now = new Date().getTime();
                let timeDifference = endTime - now;
                let productSecondsRemain = Math.floor(timeDifference / 1000);
                
                return data.auctiontimefilter.split(" ")[1] === '-' ? productSecondsRemain <= filteredSeconds : productSecondsRemain >= filteredSeconds;
            });
        }

        //call fuction that update filteredProducts in Products.js page
        updateFilterData(updatedProducts)
        

    } catch (error) {
        console.error('Error occurred while Filtering auction items:', error);
        throw error; 
    }
}

//function to update product status from Active to Completed when time of that auction gets over
const updateProductStatus = async (product) => {
    try {
        
        const response = await 
            axios.put(`http://127.0.0.1:8000/api/items/${product.id}/`, {
                title: product.title,
                description: product.description,
                category: product.category, 
                starting_bid: product.starting_bid,
                current_bid: product.current_bid,
                seller: product.seller, 
                bidder: product.bidder,
                created_at: product.created_at,
                end_time: product.end_time,
                winner: product.bidder,  
                status: 'completed'
            }   ,{
                headers: {
                    'Authorization': `Token ${apiToken}`  
                }
            });
        
        return response.data
        
    } catch (error) {
        console.error('Error occurred while searching auction items :', error);
        throw error; // Re-throw the error for handling in the calling code
    }
};

//gets Simple JsonWebToken on successfull login by posting data 
const loginUserData=async(email,password)=>{
    try {
        
        const response = await axios.post('http://127.0.0.1:8000/auth/login/',{
            'email':email,
            'password':password,
        },{
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

// get simple JsonWebToken on successfull account creation
const signUpUserData= async(user)=>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/signup/',{
            'username':user.username,
            'password':user.password,
            'firstname':user.firstname,
            'lastname':user.lastname,
            'email':user.email,
        },{
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        })

        return response
    } catch (error) {
        console.log(error.message); 
        return error 
    }
}


// check if user have token in browser's cookie
const isUserAuthenticated = ()=>{
    try {
        return Cookies.get('data') ? JSON.parse(Cookies.get('data')).access_token: null;
    } catch (error) {
        console.log(error.message);
    }
}


const fetchTokenData=(token)=>{
    return  jwtDecode(token)
}

// function to get all users of database
const getUsers = async () =>{
    try {
        const response= await axios.get('http://127.0.0.1:8000/api/users/',{
                headers: {
                    'Authorization': `Token ${apiToken}`  
                }
        })
        return response.data 
    } catch (error) {
        console.log("error fetching users",error.message);  
    }
}
// get all auction items from database
const getAuctions = async () =>{
    try {
        const response= await axios.get('http://127.0.0.1:8000/api/items/',{
                headers: {
                    'Authorization': `Token ${apiToken}`  
                }
        })
        return response.data 
    } catch (error) {
        console.log("error fetching users",error.message);  
    }
}


// get user information from user id
const getUserInfoById = async (id) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/userinfo/', {
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        });
        
        // Assuming response.data is an array of user objects
        const userinfo = response.data.filter(value => value.user_id === id);
        return userinfo;
    } catch (error) {
        console.log("error fetching users", error.message);
        return error;
    }
}
// get basic user data from user-id
const getUserById = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, {
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        });
        
        return response.data;
    } catch (error) {
        console.log("error fetching users", error.message);
        return error;
    }
}

// get all Bids of perticular user id 
const getBidsById = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/bids/`, {
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        });
        const data=response.data
        const sortedData = data.sort((a, b) => new Date(b.bid_time) - new Date(a.bid_time));
        
        return sortedData.filter((value)=>{return value.user_id === id ? true : false}).slice(0,3);
    } catch (error) {
        console.log("error fetching users", error.message);
        return error;
    }
}
// get auction items by item-id
const getItemById = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}/`, {
            headers: {
                'Authorization': `Token ${apiToken}`  
            }
        });
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            return []
        }
        console.log("error fetching users", error.message);
        return error;
    }
}

// get all usernames from database
const getUsernames = async () =>{
    try{
        var users = await getUsers() 
        users=new Set(users.map((value)=>{return value.username.toLowerCase()}));
       return users;
    }
    catch (error){
        console.log("Error Fetching users",error.message);
        
    }
}

// setting default user info if user hasn't set that
const setDefaultUserInfo = async (token) =>{
    const user = fetchTokenData(token);
    
    const response = await axios.post(
        `http://127.0.0.1:8000/api/userinfo/`,
        {
          "user_id": user.user_id,
          "profileimage_url": "",
          "mobile": "N/A",
          "dateofbirth": "",
          "city": "N/A",
          "state": "N/A",
          "country": "N/A",
          "description": "N/A",
          "gender": "N/A",
          "address": "N/A",
          "zipcode": "N/A",
          "about_user": "N/A",
          "joining_date": new Date().toISOString().split('T')[0],
        },
        {
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Content-Type' : `multipart/form-data`
            }
        }
    );
    return response.status
}
// function to place bid on auction item and become current bidder
const placeAuctionBid = async (product,bid_amount,userid) =>{
    try {
        
        const response = await axios.put(`http://127.0.0.1:8000/api/items/${product.id}/`, {
                title: product.title,
                description: product.description,
                category: product.category, 
                starting_bid: product.starting_bid,
                current_bid: bid_amount,
                seller: product.seller,
                bidder: userid, 
                created_at: product.created_at,
                end_time: product.end_time,
                winner: product.winner,  
                status: product.status
            }   ,{
                headers: {
                    'Authorization': `Token ${apiToken}`  
                }
            });

        
        await addBidToModel(product,bid_amount,userid)
        return response.data
        
    } catch (error) {
        console.error('Error occurred while searching auction items :', error);
        throw error; // Re-throw the error for handling in the calling code
    }
}
// to add the data of Bid user recently placed on item
const addBidToModel = async (product,bid_amount,userid) =>{
    try {
        
        const response = await axios.post(`http://127.0.0.1:8000/api/bids/`, {
                bid_amount: bid_amount,
                bid_time: new Date().toISOString(),
                item_id: product.id, 
                user_id: userid
            }   ,{
                headers: {
                    'Authorization': `Token ${apiToken}`  
                }
            });
        
        return response.data
        
    } catch (error) {
        console.error('Error occurred while searching auction items :', error);
        throw error; // Re-throw the error for handling in the calling code
    }
}

// to place item for auction by any user
const placeItemToAuction=async(item,sellerid)=>{
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/items/`, {
                "title": item.title,
                "description": item.description,
                "category": item.category,
                "bidder": "",
                "starting_bid": item.starting_bid,
                "current_bid": "",
                "image_url": item.image_url,
                "seller": sellerid,
                "created_at": new Date().toISOString(),
                "end_time": item.end_time,
                "winner": "",
                "status": "active"
            }   ,{
                headers: {
                    'Authorization': `Token ${apiToken}`,
                    'Content-Type' : `multipart/form-data`
                }
            });
        
        return [response.data]
        
    } catch (error) {
        console.error('Error occurred while searching auction items :', error);
        return []
    }
}

export { 
    fetchAuctionItems,
    placeAuctionBid,
    fetchAuctionCategory,
    getCategoryNameById,
    handleFilterSubmit ,
    updateProductStatus,
    signUpUserData,
    loginUserData,
    isUserAuthenticated,
    fetchTokenData,
    getUsers,
    getAuctions,
    getUsernames,
    getUserInfoById,
    getUserById,
    getBidsById,
    getItemById,
    setDefaultUserInfo,
    placeItemToAuction
};
