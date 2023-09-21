import classes from './Dashboard.module.css'
import React from 'react'
import { Context } from '../../Context/index';
import AppCard from '../Components/AppCard/AppCard';
import AppInfoSpend from '../Components/AppInfoSpend/AppInfoSpend';
import LicenseTable from '../Components/LicenseTable/LicenseTable';
import IncreaseTable from '../Components/IncreaseTable/IncreaseTable';
import StatusTable from '../Components/StatusTable/StatusTable';
import CategorySection from '../Components/CategorySection/CategorySection';
import ChartWrapper from '../Components/ChartWrapper/ChartWrapper';
import Filters from '../Components/Filters/Filters';

const Dashboard = () => {
    const { totalTime } = React.useContext(Context);

    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
   
  return (
    <div>
      <Filters />
      <div className={classes.parent}>
        <div className={classes.div1}>
          <AppCard title={`Invoice spend overtime - ${USDollar.format(totalTime)}`}>
            <ChartWrapper />
          </AppCard>
        </div>
        <div className={classes.div2}>
          <AppCard title={`Application spend increase`}>
            <IncreaseTable />
          </AppCard>
        </div>
        <div className={classes.div3}>
          <AppCard title={`Paid user status`}>
            <StatusTable />
          </AppCard>
        </div>
        <div className={classes.div4}>
          <AppCard title={`Most expensive app`}>
            <AppInfoSpend />
          </AppCard>

        </div>
        <div className={classes.div5}>
          <AppCard title={`Most expensive licenses`}>
            <LicenseTable />
          </AppCard>

        </div>
        <div className={classes.div6}>
          <AppCard title={`Spend by category`}>
            <CategorySection />
          </AppCard>

        </div>
      </div>
      {/* <DatePickerInput minDate={minDate} pb={40} maxDate={maxDate} type="range" value={dateFilter} onChange={setDateFilter} />
      */}
    </div>
  )
}

export default Dashboard