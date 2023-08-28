import axios from "axios";

const instance = axios.create({
  baseURL: "https://fininvestfx-sever.onrender.com/",
});

export const getFoodList = async (sort,category) => {
  return await instance.get(`/food?category=${category}&sort=${sort}`);
};
export const getCategory = async () => {
  return await instance.get("/food/category");
};
export const updateFood = async (id,body) => {
  console.log({id,body})
  return await instance.put(`/food/update/${id}`,body);
};
