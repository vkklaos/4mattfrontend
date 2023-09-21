import classes from './ShellApp.module.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Flex, Group, Image } from '@mantine/core';
import { Context } from '../../Context';
import Logo from "../../Assets/Pngs/logo.png";
import Dashboard from '../Components/Dashboard/Dashboard';

export function ShellApp() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { active, setActive, navigation } = React.useContext(Context);

  const links = navigation.map((item) => (
    <a
      className={classes.headerButton}
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
    <BrowserRouter>
      <AppShell
        layout="alt"
        classNames={{
          main: classes.content,
          navbar: classes.appSidebar,
          header: classes.appHeader,
        }}
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header withBorder={false}>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Group justify="start" style={{ flex: 1 }}>
            <Group ml="xl" gap={40} visibleFrom="sm" className={classes.headerGroup} >
              {links}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
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
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  );
}