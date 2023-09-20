import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';
import classes from './Shell.module.css';
import Header from '../Header/Header';
import Sidenav from '../Sidenav/Sidenav';
import { Context } from '../../Context';
import Dashboard from '../Dashboard/Dashboard';

export function Shell() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { active, setActive } = React.useContext(Context);

  return (
    <BrowserRouter>
      <AppShell
        layout="alt"
        classNames={{
          root: classes.root,
          navbar: classes.navbar,
          header: classes.header
        }}
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <Header
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          active={active}
          setActive={setActive}
        />
        <Sidenav />
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  );
}