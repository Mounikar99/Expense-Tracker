import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../styles/chart.css';

function ChartComponent({expenses, type}) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if(!expenses) {
      return;
    }
    const filtered = expenses.filter((expense) => expense.type === type);
    const data = groupBy(filtered, "category");
    setChartData(data);
  }, [expenses, type]);
  const groupBy = (array, key) => {
    if(!array || !key) {
      return null;
    }
    const groupedData = array.reduce((result, item) => {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});
    const data = [["Category", "Amount"]];
    Object.keys(groupedData).forEach((key) => {
      const modifiedKey = key[0].toUpperCase() + key.slice(1);
      data.push([modifiedKey, groupedData[key].reduce((sum, item) => sum + item.amount, 0)]);
    })
    return data;
  }
     
  const options = {
    title: type === "earn" ? "Earnings" : "Expenses",
    backgroundColor: "#202020"
  };
    return (
        <div className='chartContainer'>
            <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
                legendToggle={false}
                width={"530px"}
                height={"400px"}
                style={{ color: "#6c6c6c", borderRadius: "10px", boxShadow: "5px 6px 10px rgb(0 0 0 / 57%)", border: "1px solid #494949" }}
                />
        </div>
    )
}

export default ChartComponent;
