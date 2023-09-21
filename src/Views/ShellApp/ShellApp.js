import classes from './ShellApp.module.css';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Flex, Group, Image } from '@mantine/core';
import { Context } from '../../Context';
import Logo from "../../Assets/Pngs/logo.png";
import Dashboard from '../Dashboard/Dashboard';
import HelloWorldPage from '../HelloWorldPage/HelloWorldPage'

export function ShellApp() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { active, setActive, navigation } = React.useContext(Context);

  const links = navigation.map((item) => (
    <Link
      className={classes.headerButton}
      data-active={item.link === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.link);
      }}
    >
      <span>{item.label}</span>
    </Link>
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
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
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
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Image src={Logo} />
          </Flex>
        </AppShell.Navbar>
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/spends" element={<HelloWorldPage />} />
            <Route path="/transactions" element={<HelloWorldPage />} />
            <Route path="/licenses" element={<HelloWorldPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  );
}