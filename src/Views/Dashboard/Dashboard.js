import React from 'react'
import { Context } from '../../Context';
import Card from '../Components/Card/Card';
import Filter from '../Components/Filter/Filter';

const Dashboard = () => {
    const { active } = React.useContext(Context);

  return (
    <div>
      <Filter />
      <Card />
    </div>
  )
}

export default Dashboard