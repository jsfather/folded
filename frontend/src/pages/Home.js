import Layout from "../layouts/default";
import {useEffect, useState} from "react";
import CostDetails from "../components/CostDetails";

const Home = () => {
    const [costs, setCosts] = useState(null);

    useEffect(() => {
        const fetchCosts = async () => {
            const response = await fetch("/api/costs");
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
                    <CostDetails key={cost._id} cost={cost} style={'backgroundColor: red'} />
                ))}
            </div>
        </Layout>
    )
}

export default Home;