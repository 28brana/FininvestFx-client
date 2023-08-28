// @mui
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "react-query";
import { updateFood } from "./service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const row = [
//   {
//     id: 0,
//     name: "Uthappizza",
//     image: "https://i.imgur.com/tDnjTXf.jpg",
//     category: "mains",
//     label: "Hot",
//     price: "4.99",
//     description:
//       "A unique combination of Indian Uthappam (pancake) and Italian pizza",
//   },
//   {
//     id: 1,
//     name: "Zucchipakoda",
//     image: "https://i.imgur.com/xkUElXq.jpg",
//     category: "appetizer",
//     label: "",
//     price: "1.99",
//     description:
//       "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce",
//   },
//   {
//     id: 2,
//     name: "Vadonut",
//     image: "https://i.imgur.com/anUAlqF.jpg",
//     category: "appetizer",
//     label: "New",
//     price: "1.99",
//     description:
//       "A quintessential ConFusion experience, is it a vada or is it a donut?",
//   },
//   {
//     id: 3,
//     name: "ElaiCheese Cake",
//     image: "https://i.imgur.com/c5hBTEW.jpg",
//     category: "dessert",
//     label: "",
//     price: "2.99",
//     description:
//       "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms",
//   },
//   {
//     id: 4,
//     name: "Guntur chillies",
//     image: "https://i.imgur.com/Vc9JIXP.jpg",
//     category: "appetizer",
//     label: "Spicy",
//     price: "0.99",
//     description: "Assorted chillies from Guntur",
//   },
//   {
//     id: 5,
//     name: "Buffalo Paneer",
//     image: "https://i.imgur.com/pH2tkgk.jpg",
//     category: "appetizer",
//     label: "",
//     price: "5.99",
//     description: "A special type of Paneer made from Buffalo milk",
//   },
//   {
//     id: 6,
//     name: "Cherry Tomatoes",
//     image: "https://i.imgur.com/fRy8hjE.jpg",
//     category: "clone",
//     label: "clone",
//     price: "9.99",
//     description: "clone of cherry and tomato",
//   },
//   {
//     id: 7,
//     name: "Goat Milk",
//     image: "https://i.imgur.com/zFGPhrI.jpg",
//     category: "weird",
//     label: "weird",
//     price: "1.99",
//     description: "Medicinal Goat Milk",
//   },
//   {
//     id: 8,
//     name: "Rose breasted Grosbeak chicken",
//     image: "https://i.imgur.com/RYsqgoo.jpg",
//     category: "appetizer",
//     label: "New",
//     price: "7.99",
//     description: "Roasted rare bird",
//   },
//   {
//     id: 9,
//     name: "Toenail Zingy",
//     image: "https://i.imgur.com/IpG3YOT.jpg",
//     category: "appetizer",
//     label: "weird",
//     price: "0.99",
//     description: "Cooked Toenails of various animals",
//   },
// ];

export default function Table({ row, isLoading, isError }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ id, value }) => updateFood(id, { price: +value }),
    {
      onSuccess: () => {
        toast("Updated Successfull", { type: "success" });
        queryClient.invalidateQueries(["food"]);
      },
      onError: () => {
        toast("Updated Failed", { type: "error" });
      },
    }
  );
  const handleSave = (id, value) => {
    console.log({ id, value });
    mutate({ id, value });
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 220,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems={"center"} gap={2}>
            <Avatar
              variant="rounded"
              src={params.row.image}
              alt={params.row.name}
            />
            <p>{params.row.name}</p>
          </Stack>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "label",
      headerName: "Label",
      flex: 1,
      minWidth: 120,
    },
    {
      type: "number",
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 280,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      renderCell: (params) => {
        const currentId = params.row._id;
        const updatedPrice = params.row.price;
        const originalValue = row.find((x) => x._id === currentId)?.price;
        const handleReset = () => {
          params.hasFocus = false;
          params.row.price = originalValue;
        };

        if (updatedPrice === originalValue) {
          return <p>---</p>;
        }
        return (
          <Stack direction={"row"} gap={2}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleSave(currentId, updatedPrice);
              }}
            >
              Save
            </Button>
            <Button variant="outlined" size="small" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        );
      },
    },
  ];

  if (isLoading || isError || row.length === 0) {
    let msg = "No Data Found 😓";
    if (isLoading) {
      msg = "...Loading";
    } else if (isError) {
      msg = "...isError";
    }
    return (
      <Stack height={"40vh"} alignItems={"center"} justifyContent={"center"}>
        <Typography>{msg}</Typography>
      </Stack>
    );
  }

  return (
    <div>
      <DataGrid
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            color: "#00000",
            fontWeight: "bold",
          },
          background: "white",
        }}
        columns={columns}
        rows={row}
        hideFooterPagination={true}
        hideFooter={true}
        getRowId={(row) => row._id}
      />
      <ToastContainer />
    </div>
  );
}
