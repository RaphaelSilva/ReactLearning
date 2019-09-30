import React, { Suspense, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import RenderMenu from '../component/RenderMenu';
import { MenuList } from '../utils/Menu';
import BodyPerfil from './containers/BodyPerfil';
import SecurityComponet, { ISecurityComponet } from '../component/SecurityComponet';

const BodyDashboard = React.lazy(() => import('./containers/BodyDasboard'))

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props: Readonly<ISecurityComponet>) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuList: MenuList = [
    { label: 'Dashboard', icon: 'dashboard', link: '/member/Dashboard' },
    { label: 'Perfil', icon: 'account_circle', link: '/member/Perfil' },
    { label: 'Serviço & Produto', icon: 'work', link: '/member/Serviço' },
    { label: 'Pedidos', icon: 'shopping_cart', link: '/member/Pedidos' },
    { label: 'Clientes', icon: 'people', link: '/member/Clientes' },
    { label: 'Integração', icon: 'layers', link: '/member/Integração' },
  ]

  console.log("location DashBoard => " + props.location)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)} >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Area do Membro
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" classes={
        { paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }
      } open={open} >

        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <RenderMenu value={menuList} />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>

            <Route path='/member/Perfil' render={(p) =>
              <SecurityComponet {...p} {...props}>
                <Suspense fallback={<div>Loding.......</div>}>
                  <BodyPerfil {...p} {...props}/>
                </Suspense>
              </SecurityComponet>
            } />

            <Route path={['/member/:text', '/member', '/member/Dashboard']} render={(p) =>
              <SecurityComponet {...p} {...props}>
                <Suspense fallback={<div>Loding.......</div>}>
                  <BodyDashboard {...p} {...props} name='BodyDasboard'/>
                </Suspense>
              </SecurityComponet>
            } />

          </Switch>
        </Container>
      </main>
    </div >
  );
}