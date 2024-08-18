import axios from 'axios';
// import { useState } from 'react';

const fetchAuctionItems = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        const activeitems=response.data.filter((p)=> {return (p.status==='active' ? true:false)})

        return activeitems; // Return the actual data
    } catch (error) {
        console.error('Error occurred while fetching auction items:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
};


const fetchAuctionCategory = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/category/');
        return response.data; // Return the actual data
    } catch (error) {
        console.error('Error occurred while fetching Cateogries :', error);
        throw error; // Re-throw the error for handling in the calling code
    }
};


const handleFilterSubmit = (data,products,categories,updateFilterData) =>{
    try {
        let updatedProducts = [...products];
        // console.log("products recieved for filtering",products);
        // console.log("data selection recieved for filtering",data);
        
        if (data.categoryselection !== 'None') {
            let filtered_category_id = categories.find(filterCategory => filterCategory.category === data.categoryselection).id;
            updatedProducts = updatedProducts.filter(product => product.category === filtered_category_id);
            
            
        }
        if (data.rangeofprice !== '-1') {
            let minRange = Number(data.rangeofprice);
            let maxRange = Number(data.rangeofprice) + 500;
            updatedProducts = updatedProducts.filter(product => product.current_bid >= minRange && product.current_bid <= maxRange);
           
        }
        if (data.auctiontimefilter && data.auctiontimefilter !== 'None') {
            console.log(data.auctiontimefilter);
            
            let filteredSeconds = Number(data.auctiontimefilter.split(" ")[0]) * 60 * 60;
            
            updatedProducts = updatedProducts.filter(product => {
                let endTime = new Date(product.end_time).getTime();
                let now = new Date().getTime();
                let timeDifference = endTime - now;
                let productSecondsRemain = Math.floor(timeDifference / 1000);
                
                return data.auctiontimefilter.split(" ")[1] === '-' ? productSecondsRemain <= filteredSeconds : productSecondsRemain >= filteredSeconds;
            });
        }
        // console.log("Updated FIlters sent ",updatedProducts);
        
        updateFilterData(updatedProducts)
        

    } catch (error) {
        console.error('Error occurred while Filtering auction items:', error);
        throw error; 
    }
}


const updateProductStatus = async (product) => {
    try {
        console.log("Product reached is ",await product);
        
        const response = await 
            axios.put(`http://127.0.0.1:8000/api/items/${product.id}/`, {
                title: product.title,
                description: product.description,
                category: product.category, 
                starting_bid: product.starting_bid,
                current_bid: product.current_bid,
                seller: product.seller, 
                created_at: product.created_at,
                end_time: product.end_time,
                winner: product.winner,  
                status: 'completed'
            });
        
        return response.data
        
    } catch (error) {
        console.error('Error occurred while searching auction items :', error);
        throw error; // Re-throw the error for handling in the calling code
    }
};

export { fetchAuctionItems,fetchAuctionCategory,handleFilterSubmit ,updateProductStatus};
