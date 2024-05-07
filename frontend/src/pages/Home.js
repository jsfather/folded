import Button  from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Fingerprint} from "@mui/icons-material";

const Home = () => {
    return (
        <div className="home">
            <h2>Home</h2>
            <Button variant="contained">Hello world</Button>
            <IconButton color="primary">
                <Fingerprint />
            </IconButton>
        </div>
    )
}

export default Home;