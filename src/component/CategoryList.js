import { MenuItem, Select } from "@mui/material";
import { useQuery } from "react-query";
import { getCategory } from "../service/api";

const CategoryList = ({ handleChangeCategory, category }) => {
  const { data: categoryList, isLoading } = useQuery("category", getCategory);
  return (
    <Select
      variant="outlined"
      displayEmpty
      onChange={handleChangeCategory}
      value={category}
    >
      <MenuItem disabled value="">
        Select Category
      </MenuItem>
      {!isLoading &&
        categoryList?.data?.data?.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
    </Select>
  );
};

export default CategoryList;
