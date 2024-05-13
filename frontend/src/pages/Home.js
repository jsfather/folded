import * as React from 'react';
import Layout from "../layouts/default";
import {useEffect, useState} from "react";
import CostDetails from "../components/CostDetails";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
    const [costs, setCosts] = useState(null);
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
                setCosts(json)
            }
        }

        fetchCosts()
    }, []);

    return (
        <Layout title="Home">
            <div className="home">
                {costs && costs.map((cost) => (
                    <CostDetails key={cost._id} cost={cost}/>
                ))}
            </div>

            <Fab sx={{position: "fixed", bottom: '16px', right: "16px"}} color="primary" aria-label="add"
                 onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
        </Layout>
    )
}

export default Home;