//onst Movie = require('../model/MovieSchema')
const Movie = require('../../model/BollyhubSchema')

module.exports = {
    animation:async function(req,res){
        const startindex = (parseInt(req.query.page) - 1) * parseInt(req.query.limit) 
        const list = await Movie.find({category:"Animation"}).limit(parseInt(req.query.limit)).skip(startindex).exec()
        const limit = await Movie.find({category:"Animation"}).countDocuments()  
         try{
            return  res.json({data:list,limit:limit})
         }catch(err){
             console.log("fail")
        }
    }
}
