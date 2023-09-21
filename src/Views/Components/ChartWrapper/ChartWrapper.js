import React from 'react'
import { Context } from '../../../Context';
import LineChart from '../LineChart/LineChart';
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder';

const ChartWrapper = () => {
    const { filteredItems } = React.useContext(Context);


    const [chartData, setChartData] = React.useState(
      {
        labels: ['Data 1'],
        datasets: [
          {
            label: 'Values',
            data: [65],
            fill: false,
            borderColor: 'rgba(61, 27, 135, 1)',
            backgroundColor: 'rgba(143, 86, 209, 0.4)',
          },
        ],
      }
    );

    React.useEffect(() => {
      if (filteredItems.length !== 0) {
        const months = filteredItems.map((item) => {
          item.date = new Date(item.date);
          item.date.setDate(1);
          item.date = item.date.toLocaleDateString('en-US');
          return item;
        });
        const result = months.reduce((acc, obj) => {
          const existingObj = acc.find(item => item.date === obj.date);
          if (existingObj) {
            existingObj.spend += obj.spend;
          } else {
            acc.push({ spend: obj.spend,  date: obj.date });
          }
          return acc;
        }, []);
        const dates = result.map((item) => {
          return item.date;
        })
        const spends = result.map((item) => {
          return item.spend;
        })
        setChartData(
          {
            labels: dates,
            datasets: [
              {
                label: '$',
                data: spends,
                fill: false,
                borderColor: 'rgba(61, 27, 135, 1)',
                backgroundColor: 'rgba(143, 86, 209, 0.4)',
              },
            ],
          }
        )
      }
    }, [filteredItems])

  return (
    <div style={{width: '100%'}}>
        {filteredItems.length !== 0 ?
            <LineChart data={chartData} />
        :
            <div style={{paddingTop: '40px', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <CardPlaceholder content={'No spend in selected period'} />
            </div>
        }
    </div>
  )
}

export default ChartWrapper