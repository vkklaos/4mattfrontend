import classes from './Filters.module.css'
import { DatePickerInput } from '@mantine/dates'
import React from 'react'
import { Context } from '../../../Context';
import { Select } from '@mantine/core';

const Filters = () => {
    const { items, minDate, maxDate, dateFilter, setDateFilter, categoryFilter, setCategoryFilter } = React.useContext(Context);

    const categories = ["All"];
    const contextCategories = [...new Set(items.map(obj => obj.category))];
    categories.push(...contextCategories);

  return (
    <div className={classes.container}>
        <DatePickerInput minDate={minDate} maxDate={maxDate} type="range" value={dateFilter} onChange={setDateFilter} />
        <Select placeholder="Category" data={categories} value={categoryFilter} onChange={setCategoryFilter} />
    </div>
  )
}

export default Filters