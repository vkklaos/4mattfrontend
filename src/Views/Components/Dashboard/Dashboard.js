import React from 'react'
import { Context } from '../../../Context';
import { DatePickerInput } from '@mantine/dates';
import AppCard from '../AppCard/AppCard';
import { Grid } from '@mantine/core';

const Dashboard = () => {
    const { minDate, maxDate, filteredItems, setDateFilter, dateFilter, totalTime } = React.useContext(Context);

    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  return (
    <div>
      <DatePickerInput minDate={minDate} pb={40} maxDate={maxDate} type="range" value={dateFilter} onChange={setDateFilter} />
      <Grid>
        <Grid.Col span={{ base: 12, xs: 7 }}>
          <AppCard title={`Invoice spend overtime - ${USDollar.format(totalTime)}`} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 5 }}>
          <AppCard title={`Application spend increase`} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <AppCard title={`Paid user status: inactive`} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          <AppCard title={`Most expensive app`} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 5 }}>
          <AppCard title={`Most expensive licenses`}>
            <p>{filteredItems.length !== 0 && filteredItems[0].application}</p>
          </AppCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }} offset={{ base: 0, xs: 4}}>
          <AppCard title={`Spend by category`} />
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default Dashboard