import classes from './Filters.module.css'
import { DatePickerInput } from '@mantine/dates'
import React from 'react'
import { Context } from '../../../Context';
import { Select } from '@mantine/core';

const Filters = () => {
    const { items, minDate, maxDate, dateFilter, setDateFilter, categoryFilter, setCategoryFilter, appFilter, setAppFilter } = React.useContext(Context);

    const categories = ["All categories"];
    categories.push(...[...new Set(items.map(obj => obj.category))]);

    const applications = ["All applications"];
    applications.push(...[...new Set(items.map(obj => obj.application))]);

  return (
    <div className={classes.container}>
        <DatePickerInput allowDeselect={false} minDate={minDate} maxDate={maxDate} type="range" value={dateFilter} onChange={setDateFilter} />
        <Select allowDeselect={false} placeholder="Category" data={categories} value={categoryFilter} onChange={setCategoryFilter} disabled={appFilter !== "All applications"} />
        <Select allowDeselect={false} placeholder="Application" data={applications} value={appFilter} onChange={setAppFilter} disabled={categoryFilter !== "All categories"} />
    </div>
  )
}

export default Filters