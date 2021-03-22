const ProductSchema = new mongoose.Schema({
  productID: {
    type: Number,
    unique: true
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  feature: [{
    feature: String,
    value: String
  }],
  style: [{
    name: String,
    original_price: Number,
    sale_price: Number,
    default: Boolean,
    photos: [{
      thumbnail_url: String,
      url: String
    }],
    skus: [{
      stock_id: Number,
      quantity: Number,
      size: String
    }]
  }]
})