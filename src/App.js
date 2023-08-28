import { Button, Container, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import Table from "./Table";
import CategoryList from "./component/CategoryList";
import { getFoodList } from "./service/api";
function App() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const {
    data: foodList,
    isLoading,
    isError,
  } = useQuery(["food",sort,category], ()=>{
    return getFoodList(sort,category);
  });

  const handleResetFilter=()=>{
    setCategory('');
    setSort('');
  }
  return (
    <div className="App">
      <Container sx={{ pt: 5, pb: 10 }}>
        <Typography variant="h3" textAlign={"center"}>
          Fininvest Assignment 🧑‍💻
        </Typography>
        <Typography variant="subtitle2" textAlign={"center"}>
          To Edit Price double click on price cell of table
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
         gap={2}
          my={4}
        >
          <CategoryList
            category={category}
            handleChangeCategory={handleChangeCategory}
          />
          <Select
            variant="outlined"
            displayEmpty
            onChange={handleChangeSort}
            value={sort}
          >
            <MenuItem disabled value="">
              Select Sort{" "}
            </MenuItem>
            <MenuItem value="ASC">Ascending </MenuItem>
            <MenuItem value="DESC">Descending</MenuItem>
          </Select>
          <Button onClick={handleResetFilter}>Reset Filter</Button>
        </Stack>
        <Table
          row={foodList?.data?.data || []}
          isLoading={isLoading}
          isError={isError}
        />
      </Container>
    </div>
  );
}

export default App;
