import React from 'react'
import classes from './AppCard.module.css'
import { Text } from '@mantine/core'

const AppCard = ({ title, children }) => {
  return (
    <div className={classes.appCard}>
      <Text className={classes.cardTitle}>{title}</Text>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  )
}

export default AppCard