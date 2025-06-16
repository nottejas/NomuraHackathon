import * as d3 from "d3"
import { useEffect, useRef } from "react";

const Barchart = () => {
    const ref = useRef();
    useEffect(() => {
        const margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv")
            .then((data) => {
                // Ensure numeric values are parsed properly
                data.forEach(d => d.Value = +d.Value);

                const x = d3
                    .scaleBand()
                    .range([0, width])
                    .domain(data.map(d => d.Country))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

                const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
                svg.append("g").call(d3.axisLeft(y));

                svg.selectAll("mybar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", d => x(d.Country))
                    .attr("y", d => y(d.Value))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d.Value))
                    .attr("fill", "#69b3a2");
            })
            .catch(error => {
                console.error("Error loading or parsing data:", error);
            });
    }, []);

    return <svg width={460} height={400} id="barchart" ref={ref} />;

};


export default Barchart;