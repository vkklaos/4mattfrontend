import React from "react";
import { DataItem } from "../Classes/DataItem";
import data from './data.json'

export const Context = React.createContext({});
export const Storage = ({ children }) => {

  const navigation = [
    { link: '', label: 'Cost Optimization Dashboard'},
    { link: '', label: 'Application Spend'},
    { link: '', label: 'Transactions'},
    { link: '', label: 'Licences'},
  ];
  const [items, setItems] = React.useState([]);
  const [active, setActive] = React.useState('Cost Optimization Dashboard');

  const [totalTime, setTotalTime] = React.useState(0);
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [sumFiltered, setSumFiltered] = React.useState([]);
  const [categoryArray, setCategoryArray] = React.useState([]);
  const [increaseArray, setIncreaseArray] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState([null, null]);

  const [minDate, setMinDate] = React.useState(null);
  const [maxDate, setMaxDate] = React.useState(null);

  const [maxSpend, setMaxSpend] = React.useState(null);

    React.useEffect(() => {
      let items = data.map((item) => {
        let itemObject = new DataItem(
          item.Date,
          item.Category,
          item.Application,
          item.Spend,
          item["Active Users"],
          item["Inative Users"]
        );
        return itemObject;
      });
      var orderedDates = items.sort(function(a, b) {
        return Date.parse(a) - Date.parse(b);
      });
      setMinDate(orderedDates[0].date);
      setMaxDate(orderedDates[orderedDates.length - 1].date);
      setItems(items);
    }, []);

    React.useEffect(() => {
      if (items.length !== 0) {
        if (dateFilter[0] !== null) {
          if (dateFilter[1] !== null) {
            let resultProductData = items.filter(a => {
              let date = new Date(a.date);
              return (date >= dateFilter[0] && date <= dateFilter[1]);
            });
            setFilteredItems(resultProductData);
          }
        }
      }
    }, [items, dateFilter])

    React.useEffect(() => {
      if (filteredItems.length !== 0) {
        // calculando total pago
        let total = 0;
        filteredItems.map((item) => {
          return total += item.spend
        });
        setTotalTime(total);
        // calculando app mais caro
        const spends = filteredItems.map(item => item.spend);
        const maxSpend = Math.max(...spends);
        const appSpend = filteredItems.find(item => item.spend === maxSpend);
        const otherSpends = filteredItems.filter(item => item.application === appSpend.application);

        if (otherSpends.length > 1) {
          const totalSpend = otherSpends.reduce((acc, item) => acc + item.spend, 0);
          setMaxSpend(totalSpend);
        } else {
          setMaxSpend(maxSpend);
        }
        // organizando apps por ordem de gasto
        const result = filteredItems.reduce((acc, obj) => {
          const existingObj = acc.find(item => item.application === obj.application);
          if (existingObj) {
            existingObj.spend += obj.spend;
            existingObj.actives += obj.actives;
            existingObj.inactives += obj.inactives;
          } else {
            acc.push({ application: obj.application, spend: obj.spend, actives: obj.actives, inactives: obj.inactives, ...obj });
          }
          return acc;
        }, []);
        result.sort((a, b) => {
          return b.spend - a.spend;
        });
        setSumFiltered(result);
        // organizando gastos por categoria
        const categorySpend = filteredItems.reduce((acc, obj) => {
          const existingObj = acc.find(item => item.category === obj.category);
          if (existingObj) {
            existingObj.spend += obj.spend;
          } else {
            acc.push({ category: obj.category, spend: obj.spend });
          }
          return acc;
        }, []);
        categorySpend.sort((a, b) => {
          return b.spend - a.spend;
        });
        setCategoryArray(categorySpend);
        // calculando o percentual de aumento da data inicial a data final
        const increases = filteredItems.reduce((acc, obj) => {
          const existingObj = acc.find(item => item.application === obj.application);
          if (existingObj) {
            if (existingObj.spend < obj.spend) {
              const percentageIncrease = ((obj.spend - existingObj.spend) / existingObj.spend) * 100;
              existingObj.increase = percentageIncrease.toFixed(2);
            }
          } else {
            acc.push({ application: obj.application, spend: obj.spend, actives: obj.actives, inactives: obj.inactives, ...obj });
          }
          return acc;
        }, []);
        const percentages = increases.filter((item) => item.increase !== undefined);
        setIncreaseArray(percentages);
      }
    }, [filteredItems, dateFilter])

    return (
        <Context.Provider
          value={{
            active,
            setActive,
            items,
            navigation,
            minDate,
            maxDate,
            filteredItems,
            setFilteredItems,
            dateFilter,
            setDateFilter,
            totalTime,
            sumFiltered,
            categoryArray,
            increaseArray,
          }}
        >
          {children}
        </Context.Provider>
    );
}