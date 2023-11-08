const axios = require('axios')
require('dotenv').config()

const getPlayerData=async (username) => {
    try{
        const playerhurl = `https://api.worldofwarships.eu/wows/account/info/?application_id=${process.env.API}&account_id`;
        const playerdata =await axios.get(playerhurl+'='+`${username}`);
        return playerdata;
    }catch(error){
        console.log('Error');
        return [];
    }
};

const getPlayerNames=async (query) => {
    try{
        const searchurl = `https://api.worldofwarships.eu/wows/account/list/?application_id=${process.env.API}&search`;
        const accounts = await axios.get(searchurl+'='+`${query}`);
        console.log({accounts})
        return accounts;
    }catch(error){
        console.log('Error');
        return [];
    }
};
module.exports = {getPlayerData,getPlayerNames}