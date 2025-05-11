import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  backgroundColor: "#65ACD6",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    boxShadow: 'none', // Remove o box-shadow
    border: 'none', // Remove qualquer bordass
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Barra de cima */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Botão para fechar a Drawer */}
          {open && (
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: 'white',
                position: 'absolute', // Garante que os botões fiquem no mesmo local
                left: '6px', // Ajuste a posição horizontal
              }}
            >
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}

          {/* Botão para abrir a Drawer */}
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: 'white',
                position: 'absolute', // Garante que os botões fiquem no mesmo local
                left: '20px', // Ajuste a posição horizontal
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" noWrap component="div" sx={{ marginLeft: '30px' }}>
            SISTEMA DE GERENCIAMENTO DA CASA DO AMOR
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Barra lateral */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { // é o responsável pelo estilo do papel
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#65ACD6",
            boxShadow: 'none', // Remove o box-shadow
            border: 'none', // Remove qualquer borda
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* icone */}
          <img src="casadoamor.png" alt="Icone Casa do Amor" style={{
            margin: '0 auto',
          }} />
        </DrawerHeader>
        <List>
          {/* <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/users" // rota para Usuários
              sx={{ color: 'white' }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Usuários" sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/patients" // rota para Pacientes
              sx={{ color: 'white' }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes" sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  );
}