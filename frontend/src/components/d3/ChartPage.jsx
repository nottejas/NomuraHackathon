import Barchart from "./Barchart";
import Piechart from "./Piechart";

const ChartPage = () => {
    const piedata = [
        { name: "Plastic", value: 45 },
        { name: "Metal", value: 25 },
        { name: "Glass", value: 15 },
        { name: "Organic", value: 10 },
        { name: "Others", value: 5 },
    ]

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Bar chart</h2>
            <Barchart />

            <h2>PieChart</h2>
            <Piechart data={piedata} />
        </div>
    )

}

export default ChartPage;