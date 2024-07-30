import s from './App.module.scss';
import SideBar from '../SideBar/SideBar';
import Window from '../Window/Window';
import { useDispatch, useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../../image/iconCalendar.svg';
import { setDark } from '../../store/reducer/menu/slice';
//Api
import { getTeam } from '../../Api/Api';
//slice
import { setExperts } from '../MyClientsFRmanager/store/reducer/Experts/slice';
//selector
import { selectorClient } from '../FrClientWork/store/reducer/Client/selector';

function App() {
  window.ondrop = (e) => {
    e.preventDefault()
  }
  document.icon = { icon };
  const role = document.getElementById('root_leader').getAttribute('role');
  const menu = useSelector(menuSelector).menu;
  const dark = useSelector(menuSelector).dark;
  const nameClient = useSelector(selectorClient).client_name;
  const cityClient = useSelector(selectorClient).client_city;
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'light');
  const location = useLocation();
  const path = location?.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (dark) {
      setTheme('dark')
      localStorage.setItem('theme', JSON.stringify('dark'))
    } else {
      setTheme('light')
      localStorage.setItem('theme', JSON.stringify('light'))
    }
  }, [dark])

  document.documentElement.dataset.theme = theme;

  useEffect(() => {
    const currentUrl = window.location.href;
    if (path == '/') {
      document.title = 'Дашборд';
      return
    }

    if (path == '') {
      document.title = '...';
      return
    }

    if (path.includes('/work/client=')) {
      document.title = `...`;
      setTimeout(() => {
        document.title = `${nameClient} ${cityClient}`;
      }, 100)
      return
    }

    if (currentUrl.includes('/?id=')) {
      document.title = `${nameClient} ${cityClient}`;
      return
    }

    if (path == '/leader/dashboard' || path == '/leader/dashboard/') {
      document.title = 'Дашборд';
      return
    }

    if (path == '/leader/dashboard/sales' || path == '/leader/dashboard/sales/') {
      document.title = `Продажи`;
      return
    }

    if (path == '/leader/dashboard/team' || path == '/leader/dashboard/team/') {
      document.title = `Команда`;
      return
    }

    if (path == '/leader/dashboard/shedule' || path == '/leader/dashboard/shedule/') {
      document.title = `Расписание`;
      return
    }

    if (path == '/leader/dashboard/metrics' || path == '/leader/dashboard/metrics/') {
      document.title = `Метрики`;
      return
    }

    if (path == '/leader/dashboard/stock' || path == '/leader/dashboard/stock/') {
      document.title = `Склад`;
      return
    }

    if (path == '/leader/dashboard/myclients' || path == '/leader/dashboard/myclients/') {
      document.title = `Мои клиенты`;
      return
    }

    if (path == '/leader/dashboard/clients' || path == '/leader/dashboard/clients/') {
      document.title = `Клиенты`;
      return
    }
  }, [path, nameClient]);

  //получаем список экспертов
  useEffect(() => {
    role == 'frmanager' && getTeam(1)
      .then(res => {
        const experts = res.data.team;
        dispatch(setExperts(experts))
      })
      .catch(err => console.log(err))
  }, [role])

  return (
    <div className={s.main}>
      <SideBar role={role} location={location} />
      <Window role={role} />
    </div>
  );
}

export default App;
