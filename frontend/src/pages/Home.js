import * as React from "react";
import Layout from "../layouts/default";
import { useEffect } from "react";
import CostDetails from "../components/CostDetails";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useCostsContext } from "../hooks/useCostsContext";

const Home = () => {
  const { costs, dispatch } = useCostsContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCosts = async () => {
      const response = await fetch("https://api.folded.ir/costs");
      const json = await response.json();
      console.log(response);

      if (response.ok) {
        dispatch({ type: "SET_COSTS", payload: json });
      }
    };

    fetchCosts();
  }, []);

  return (
    <Layout title="Home">
      <div className="home">
        {costs && costs.map((cost) => (
          <CostDetails key={cost._id} cost={cost} />
        ))}
      </div>

      <Fab sx={{ position: "fixed", bottom: "16px", right: "16px" }} color="primary" aria-label="add"
           onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export default Home;