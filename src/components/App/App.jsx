import s from './App.module.scss';
import SideBar from '../SideBar/SideBar';
import Window from '../Window/Window';

function App() {
  return (
    <div className={s.main}>
        <SideBar/>
        <Window/>
    </div>
  );
}

export default App;
