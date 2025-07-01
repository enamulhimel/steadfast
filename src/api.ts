import axios from 'axios';

const API_BASE_URL = 'http://157.230.240.97:9999/api/v1';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/shop/products`);
  return response.data;
};

export const fetchProductBySlug = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/product/${slug}`);
  return response.data;
};