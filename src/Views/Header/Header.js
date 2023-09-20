import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core'
import React from 'react'
import classes from './header.module.css'

const Header = ({ toggleMobile, toggleDesktop, mobileOpened, desktopOpened, active, setActive }) => {

  const navigation = [
    { link: '', label: 'Cost Optimization Dashboard'},
    { link: '', label: 'Application Spend'},
    { link: '', label: 'Transactions'},
    { link: '', label: 'Licences'},
  ];

  const links = navigation.map((item) => (
    <a
      className={classes.button}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));


  return (
    <AppShell.Header withBorder={false}>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Group justify="start" style={{ flex: 1 }}>
            <Group ml="xl" gap={40} visibleFrom="sm" className={classes.group} >
              {links}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
  )
}

export default Header