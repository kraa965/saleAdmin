import s from './App.module.scss';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import SideBar from '../SideBar/SideBar';
import Window from '../Window/Window';
import { useDispatch, useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../../image/iconCalendar.svg';
import { setDark } from '../../store/reducer/menu/slice';

//Api
import { getTeam, refundPay } from '../../Api/Api';
//slice
import { setExperts, setConsultants } from '../MyClientsFRmanager/store/reducer/Experts/slice';
import { setNotification, setMessageMessanger, setNotifications, setMessageStatus } from '../FrClientWork/store/reducer/Messenger/slice';
//selector
import { selectorClient } from '../FrClientWork/store/reducer/Client/selector';

//сокеты whats app
const userToken = document.getElementById('root_leader').getAttribute('token');
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  wsHost: process.env.REACT_APP_PUSHER_APP_HOST,
  wssPort: 6001,
  forceTLS: true,
  disableStats: true,
  cluster: "mt1",
  encrypted: true,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: `${process.env.REACT_APP_API_URL}api/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: "application/json"
    }
  }
});

function App() {
  window.ondrop = (e) => {
    e.preventDefault()
  }
  document.icon = { icon };
  const mangoToken = "194006459764c899d1e4f8564c899d1e4fbb";
  const role = document.getElementById('root_leader').getAttribute('role');
  const menu = useSelector(menuSelector).menu;
  const dark = useSelector(menuSelector).dark;
  const nameClient = useSelector(selectorClient).client_name;
  const cityClient = useSelector(selectorClient).client_city;
  const client_id = useSelector(selectorClient).client_id;
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'light');
  const [messageSocket, setMessageSocket] = useState({});
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

    if (path == '/leader/dashboard/event' || path == '/leader/dashboard/event/') {
      document.title = `Календарь событий`;
      return
    }
  }, [path, nameClient]);

  //получаем список экспертов
  useEffect(() => {
    getTeam(1)
      .then(res => {
        const experts = res.data.team;
        if (role == 'frmanager') {
          dispatch(setExperts(experts))
          localStorage.setItem('expertsList', JSON.stringify(experts));
          return
        }

        if (role == 'leader') {
          dispatch(setConsultants(experts))
          localStorage.setItem('consultantsList', JSON.stringify(experts));
          return
        }

      })
      .catch(err => console.log(err))

  }, [role])

  //сообщения whats up
  useEffect(() => {
    const channel = window.Echo.private(`clients.960966172649ab7e9d9338649ab7e9d936e`)
      .listen('.whatsapp', (e) => {
        console.log('Event received:', e.whatsapp);
        setMessageSocket(e.whatsapp)
      });

    return () => {
      channel.stopListening('.whatsapp');
      window.Echo.leave('clients');
    };
  }, [mangoToken]);


  useEffect(() => {
    const data = messageSocket?.data;
    const client = messageSocket?.client;

    data?.typeWebhook == 'incomingMessageReceived' && client.id == client_id && dispatch(setMessageMessanger({
      clientId: client.id, data: {
        idMessage: data.idMessage,
        messageData: data.messageData,
      }
    }));

    data?.typeWebhook == 'incomingMessageReceived' && dispatch(setNotification({
      client: client, data: {
        idMessage: data.idMessage,
        messageData: data.messageData,
      }
    }));

    data?.typeWebhook == 'incomingMessageReceived' && dispatch(setNotifications({
      client: client, data: {
        idMessage: data.idMessage,
        messageData: data.messageData,
      }
    }));

    data?.typeWebhook == 'outgoingMessageStatus' && client.id == client_id && dispatch(setMessageStatus({
      clientId: client.id,
      idMessage: data.idMessage,
      status: data.status,
    }))

  }, [messageSocket])

  return (
    <div className={s.main}>
      <SideBar role={role} location={location} />
      <Window role={role} />
    </div>
  );
}

export default App;
