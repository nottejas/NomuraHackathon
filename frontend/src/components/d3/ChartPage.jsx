import Barchart from "./Barchart";
import Piechart from "./Piechart";

const ChartPage = () => {
  const piedata = [
    { name: "Plastic", value: 45 },
    { name: "Metal", value: 25 },
    { name: "Glass", value: 15 },
    { name: "Organic", value: 10 },
    { name: "Others", value: 5 },
  ];

  return (
    <div className="min-h-screen px-4 py-17">
      <div className="flex justify-between">
        <div className="py-4 w-1/2">
          <h2>Bar chart</h2>
          <Barchart />
        </div>

        <div className="py-4 w-1/2">
          <h2>PieChart</h2>
          <Piechart data={piedata} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
