const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (request, response)=>{
    const movieId = request.body.movieId;
    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId" : movieId})
    .exec((err, info)=>{
        if(err) return response.status(400).send(err)
        // 그다음에 프론트에 다시 숫자 정보를 보내주기
        response.status(200).json({
            success : true,
            favoriteNumber : info.length
        })
    })
});

router.post("/favorited", (request, response)=>{
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    Favorite.find({"movieId": request.body.movieId, "userFrom": request.body.userFrom})
    .exec((err, info)=>{
        if(err) return response.status(400).send(err)
        
        let result = false;
        if(info.length !== 0){
            result = true;
        }

        response.status(200).json({
            success : true,
            favorited : result
        })
    })
});

router.post("/removeFromFavorite", (request, response)=>{

    Favorite.findOneAndDelete({ movieId : request.body.movieId, userFrom : request.body.userFrom })
    .exec((err, doc)=>{
        if(err) return response.status(400).send(err);
        response.status(200).json({
            success : true, doc
        })
    })

});

router.post("/addToFavorite", (request, response)=>{

    const favorite = new Favorite(request.body)
    favorite.save((err, doc)=>{
        if(err) return response.status(400).send(err);
        return response.status(200).json({
            success : true
        })
    });
});

router.post("/getFavoreMovie", (request, response)=>{
    Favorite.find({'userFrom' : request.body.userFrom})
    .exec((err, favorites)=>{
        if(err) return response.status(400).send(err);
        return response.status(200).json({
            success : true,
            favorites
        })
    })
});

router.post("/removeFromFavorite", (request, response)=>{
    Favorite.findByIdAndDelete({movieId : request.body.movieId, userFrom : request.body.userFrom})
    .exec((err, result)=>{
        if(err) return response.status(400).send(err);
        return response.status(200).json({
            success : true
        })
    });
})


module.exports = router;
