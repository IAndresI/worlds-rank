import '../../styles/globals.scss';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import {useEffect} from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if(localStorage.getItem("dark-theme") === "false") document.documentElement.setAttribute("data-theme", "light")
    else document.documentElement.setAttribute("data-theme", "dark")
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
