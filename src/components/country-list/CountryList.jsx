import { useCities } from "../../contexts/CitiesProvider";
import CityItem from "../city-item/CityItem";
import CountryItem from "../country-Item/CountryItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./CountryList.module.css";
function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  // Another Solutions
  // const countriesSet = new Set();

  // const countries = Array.from(cities, (city) => {
  //   if (!countriesSet.has(city.country)) {
  //     countriesSet.add(city.country);
  //     return { country: city.country, emoji: city.emoji };
  //   }
  // });

  // // Filter out any undefined elements in the array (which might occur due to the conditional return above)
  // const filteredCountries = countries.filter(Boolean);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
