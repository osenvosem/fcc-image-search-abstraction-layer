const Router = require("koa-router");
const axios = require("axios");
const Query = require("../models/Query");
const router = new Router();

// create google-images client instance
const { GCS_ID, API_KEY } = process.env;
const GoogleImages = require("google-images");
const client = new GoogleImages(GCS_ID, API_KEY);

router.get("/search/:term", async (ctx, next) => {
  const { term } = ctx.params;
  const { offset } = ctx.query;
  const options = {};
  if (offset) options.page = offset;
  Query.create({ term });
  ctx.body = normalizeResponse(await client.search(term, options));
  await next();
});

router.get("/latest", async (ctx, next) => {
  ctx.body = await Query.find({}, "-_id -__v");
  await next();
});

// helper
function normalizeResponse(arr) {
  return arr.map(({ url, thumbnail, description, parentPage }) => {
    const obj = {
      url: url,
      thumbnail: thumbnail.url,
      description: description,
      parentPage: parentPage
    };
    return obj;
  });
}

module.exports = router;

// test search
// const GoogleImages = require('google-images')

// const client = new GoogleImages('011645312027835993881:epsketg43oi', 'AIzaSyALm3Pzz4LhD98RMZvKALlMSIY6MpOmZ8Q')

// client.search('Lesly Jones')
//   .then(images => {
//     console.log(images[0])
//   })
