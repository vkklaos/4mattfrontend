import React from 'react'
import classes from './Sidenav.module.css'
import { AppShell, Flex, Image } from '@mantine/core'
import Logo from "../../Assets/Pngs/logo.png";

const Sidenav = () => {
  return (
    <AppShell.Navbar p="md" withBorder={false}>
      <Flex
        h={'100%'}
        justify="center"
        align="center"
        direction="column"
        wrap="nowrap"
      >
        <Image src={Logo} />
      </Flex>
    </AppShell.Navbar>
  )
}

export default Sidenav