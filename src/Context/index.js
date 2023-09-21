import React from "react";
import { DataItem } from "../Classes/DataItem";
import data from './data.json'

export const Context = React.createContext({});
export const Storage = ({ children }) => {

  const navigation = [
    { link: '/', label: 'Cost Optimization Dashboard'},
    { link: '/spends', label: 'Application Spend'},
    { link: '/transactions', label: 'Transactions'},
    { link: '/licenses', label: 'Licences'},
  ];
  const [active, setActive] = React.useState('Cost Optimization Dashboard');
  
  const [items, setItems] = React.useState([]);
  const [totalTime, setTotalTime] = React.useState(0);
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [sumFiltered, setSumFiltered] = React.useState([]);
  const [categoryArray, setCategoryArray] = React.useState([]);
  const [increaseArray, setIncreaseArray] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState([null, null]);
  const [categoryFilter, setCategoryFilter] = React.useState("All categories");
  const [appFilter, setAppFilter] = React.useState("All applications");

  const [minDate, setMinDate] = React.useState(null);
  const [maxDate, setMaxDate] = React.useState(null);

  const [maxSpend, setMaxSpend] = React.useState(null);

  const doDefault = React.useCallback(() => {
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
    return {
      items: items,
      minDate: orderedDates[0].date,
      maxDate: orderedDates[orderedDates.length - 1].date
    }
  }, [])

  // start app
  React.useEffect(() => {
    const result = doDefault();
    setMinDate(result.minDate);
    setMaxDate(result.maxDate);
    setDateFilter([result.minDate, result.maxDate])
    setItems(result.items);
    setActive(window.location.pathname);
  }, [doDefault]);

  // date filter effect
  React.useEffect(() => {
    if (items.length !== 0) {
      if (dateFilter[0] !== null) {
        if (dateFilter[1] !== null) {
          if (categoryFilter !== "All categories") {
            let resultProductData = items.filter(a => {
              let date = new Date(a.date);
              return date >= dateFilter[0] && date <= dateFilter[1] && a.category === categoryFilter;
            });
            if (resultProductData.length !== 0) {
              setFilteredItems(resultProductData);
            } else {
              setFilteredItems([]);
            }
          } else {
            let resultProductData = items.filter(a => {
              let date = new Date(a.date);
              return (date >= dateFilter[0] && date <= dateFilter[1]);
            });
            if (resultProductData.length !== 0) {
              setFilteredItems(resultProductData);
            } else {
              setFilteredItems([]);
            }
          }
        }
      }
    }
  }, [items, dateFilter, categoryFilter])

  // category filter effect
  React.useEffect(() => {
    if (items.length !== 0) {
      if (dateFilter[1] !== null) {
        if (categoryFilter !== "All categories") {
          let resultProductData = items.filter(a => {
            let date = new Date(a.date);
            return date >= dateFilter[0] && date <= dateFilter[1] && a.category === categoryFilter;
          });
          if (resultProductData.length !== 0) {
            setFilteredItems(resultProductData);
          } else {
            setFilteredItems([]);
          }
        }
        if (appFilter !== "All applications") {
          let resultProductData = items.filter(a => {
            let date = new Date(a.date);
            return date >= dateFilter[0] && date <= dateFilter[1] && a.application === appFilter;
          });
          if (resultProductData.length !== 0) {
            setFilteredItems(resultProductData);
          } else {
            setFilteredItems([]);
          }
        }
        if (appFilter === "All applications" && categoryFilter === "All categories") {
          let resultProductData = items.filter(a => {
            let date = new Date(a.date);
            return date >= dateFilter[0] && date <= dateFilter[1];
          });
          if (resultProductData.length !== 0) {
            setFilteredItems(resultProductData);
          } else {
            setFilteredItems([]);
          }
        }
      }
    }
  }, [items, categoryFilter, dateFilter, appFilter])

  // callbacks to get processed data

  const getTotalOvertime = React.useCallback(() => {
    let total = 0;
    filteredItems.map((item) => {
      return total += item.spend
    });
    return total;
  }, [filteredItems])

  const getMostExpensiveApp = React.useCallback(() => {
    const spends = filteredItems.map(item => item.spend);
    const maxSpend = Math.max(...spends);
    const appSpend = filteredItems.find(item => item.spend === maxSpend);
    const otherSpends = filteredItems.filter(item => item.application === appSpend.application);

    if (otherSpends.length > 1) {
      const totalSpend = otherSpends.reduce((acc, item) => acc + item.spend, 0);
      return {application: appSpend.application, spend: totalSpend};
    } else {
      return {application: appSpend.application, spend: maxSpend};
    }
  }, [filteredItems])

  const getMostExpensives = React.useCallback(() => {
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
    return result;
  }, [filteredItems])

  const getCategoryArray = React.useCallback(() => {
    const result = filteredItems.reduce((acc, obj) => {
      const existingObj = acc.find(item => item.category === obj.category);
      if (existingObj) {
        existingObj.spend += obj.spend;
      } else {
        acc.push({ category: obj.category, spend: obj.spend });
      }
      return acc;
    }, []);
    result.sort((a, b) => {
      return b.spend - a.spend;
    });
    return result;
  }, [filteredItems])

  const getIncreasePercentage = React.useCallback(() => {
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
    const result = increases.filter((item) => item.increase !== undefined);
    return result;
  }, [filteredItems])

  // main effect    

  React.useEffect(() => {
    if (filteredItems.length !== 0) {
      setTotalTime(getTotalOvertime());
      setMaxSpend(getMostExpensiveApp());
      setSumFiltered(getMostExpensives());
      setCategoryArray(getCategoryArray());
      setIncreaseArray(getIncreasePercentage());
    } else {
      setTotalTime(0);
      setMaxSpend(null);
      setSumFiltered([]);
      setCategoryArray([]);
      setIncreaseArray([]);
    }
  }, [filteredItems, dateFilter, getTotalOvertime, getMostExpensiveApp, getMostExpensives, getCategoryArray, getIncreasePercentage])

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
            maxSpend,
            categoryFilter,
            setCategoryFilter,
            appFilter,
            setAppFilter
          }}
        >
          {children}
        </Context.Provider>
    );
}