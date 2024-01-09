import s from './App.module.scss';
import SideBar from '../SideBar/SideBar';
import Window from '../Window/Window';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useEffect } from 'react';

function App() {
  window.ondrop = (e) => {
    e.preventDefault()
  }

  const menu = useSelector(menuSelector).menu;
 

  useEffect(() => {

    if (menu === 'result') {
      document.title = 'Дашборд';
      return
    }

    if (menu === 'sales' ) {
      document.title = `Продажи`;
      return
    }

    if (menu === 'team' ) {
      document.title = `Команда`;
      return
    }

    if (menu === 'skills' ) {
      document.title = `Навыки`;
      return
    }
  },[menu]);

  return (
    <div className={s.main}>
        <SideBar/>
        <Window/>
    </div>
  );
}

export default App;
