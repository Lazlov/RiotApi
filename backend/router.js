const express = require('express');
const fetch = require('node-fetch')
require('dotenv').config();
let router = express.Router();

const apiKey =process.env.API_KEY;

router.get('/:summonerName', (req,res)=>{
    const summonerName = req.params.summonerName;
    
    let url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+summonerName+`?api_key=${apiKey}`
    fetch(url)
    .then(response => {return response.json();})
     .then(data => {console.log(data,data.id)
        let id = data.id
        let url2 = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+id+`?api_key=${apiKey}`
        fetch(url2)  
         .then(response => {return response.json();})
         .then(data =>{
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(data)

            console.log(data)})     
         .catch(err =>{console.log(err)})
        })                        
     .catch(err =>{console.log(err)})
})




module.exports = router;