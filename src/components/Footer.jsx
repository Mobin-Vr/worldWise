import Styles from './Footer.module.css';

function Footer() {
   return (
      <footer className={Styles.footer}>
         <p className={Styles.copyright}>
            &copy; Copyright {new Date().getFullYear()} by worldWisw Inc.
         </p>
      </footer>
   );
}

export default Footer;
