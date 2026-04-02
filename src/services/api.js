import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Map DummyJSON product to our unified structure
const mapDummyProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  image: p.thumbnail,
  brand: p.brand,
  rating: {
    rate: p.rating,
    count: p.stock
  },
  reviews: p.reviews || []
});

export const getProducts = async () => {
  const response = await api.get('/products?limit=0');
  return response.data.products.map(mapDummyProduct);
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return mapDummyProduct(response.data);
};

export const getCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data.map(cat => cat.slug);
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products.map(mapDummyProduct);
};

export default api;
