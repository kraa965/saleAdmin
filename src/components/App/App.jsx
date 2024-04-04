import s from './App.module.scss';
import SideBar from '../SideBar/SideBar';
import Window from '../Window/Window';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import icon from '../../image/iconCalendar.svg';
import { setDark } from '../../store/reducer/menu/slice';

function App() {
  window.ondrop = (e) => {
    e.preventDefault()
  }
  document.icon = { icon };
  const role = document.getElementById('root_leader').getAttribute('role');
  const menu = useSelector(menuSelector).menu;
  const dark = useSelector(menuSelector).dark;
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const path = location?.pathname;

  useEffect(() => {
    if (dark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [dark])

document.documentElement.dataset.theme = theme;

  useEffect(() => {

    if (path == '/') {
      document.title = 'Дашборд';
      return
    }
   
    if (path == '/leader/dashboard') {
      document.title = 'Дашборд';
      return
    }

    if (path == '/leader/dashboard/sales') {
      document.title = `Продажи`;
      return
    }

    if (path == '/leader/dashboard/shedule') {
      document.title = `Расписание`;
      return
    }

    if (path == '/leader/dashboard/metrics') {
      document.title = `Метрики`;
      return
    }
  }, [path]);

  return (
    <div className={s.main}>
      <SideBar role={role} location={location} />
      <Window role={role} />
    </div>
  );
}

export default App;
