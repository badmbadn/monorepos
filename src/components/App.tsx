import { Link, Outlet } from 'react-router-dom';
import classes from './App.module.scss';
import Main from '@/assets/main.svg';

export const App = () => {
  
  // if (__PLATFORM__ === 'desktop') {
  //   return <div>ISDESKTOPPLATFORM </div>
  // }

  // if (__PLATFORM__ === 'mobile') {
  //   return <div>ISMOBILEPLATFORM</div>
  // }
 
  // if (__ENV__ === 'development') {
    
  // } 

  return (
    <div data-testid='apps' className={classes.count}>
      <h1>platform={__PLATFORM__}</h1>
      <Link to={'/about'}>abou</Link>
      <Link to={'/shop'}>shop</Link>
      <div>fffffffff</div>
      <div><Main className={classes.icon} /></div>
      <Outlet />
    </div>
  )
};
