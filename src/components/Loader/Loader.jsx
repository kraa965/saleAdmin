import './Loader.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function Loader() {
    const dark = useSelector(menuSelector).dark;
    
    return (
      <>
        {dark ?
            <div className={`loader__leaders_dark`}></div>

            :

            <div className={`loader__leaders`}>

        </div>
        }
      </>  
        
    )
};

export default Loader;