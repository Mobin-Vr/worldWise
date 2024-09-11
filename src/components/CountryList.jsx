import Spinner from './Spinner';
import styles from './CountryList.module.css';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
   const { cities, isLoading } = useCities();
   const countries = cities.reduce((arr, cur) => {
      return !arr.find((item) => item.country === cur.country)
         ? [...arr, { country: cur.country, emoji: cur.emoji }]
         : arr;
   }, []);

   if (isLoading) return <Spinner />;

   if (!cities.length)
      return (
         <Message message='Add your first city by clicking on a city on the map' />
      );

   return (
      <ul className={styles.countryList}>
         {countries.map((c) => (
            <CountryItem country={c} key={c.country} />
         ))}
      </ul>
   );
}

export default CountryList;
