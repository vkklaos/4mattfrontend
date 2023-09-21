import React from 'react'
import classes from './AppCard.module.css'
import { Text } from '@mantine/core'

const AppCard = ({ title, children }) => {
  return (
    <div className={classes.appCard}>
      <Text>{title}</Text>
      {children}
    </div>
  )
}

export default AppCard