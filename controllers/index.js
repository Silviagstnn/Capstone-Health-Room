const { response } = require('express')
const request = require('request')
const rsRujukan = 'https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=51prop&cityid=5171&type=1'
const hori = 'https://rs-bed-covid-api.vercel.app/api/get-provinces'

const rumahSakit = (req, res) => {
    callExternalApi(rsRujukan, (response) =>{
        const _temp = response.hospitals
        console.log(_temp);
        return res.json({status: 'ok', result: _temp})
    })
}

const filterRs = (req, res) => {
    console.log(req.params.provinsi)
    console.log(req.params.kota)
    console.log(req.params.type)
    const url = `https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${req.params.provinsi}&cityid=${req.params.kota}&type=${req.params.type}`
    callExternalApi(url, (response) => {
        console.log(response)
        res.json(response)
    })
}
 
// Funcion to call external API
const callExternalApi = (url, callback) => {
    request(url, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err)
     }
    return callback(body)
    })
}

module.exports = {rumahSakit, filterRs}