import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CitiesProvider";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";
import BackButton from "../BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  // Refactor flagemojiToPNG function for modern JavaScript

  const flagemojiToPNG = (flag) => {
    // Convert flag emoji to corresponding country code
    const countryCode = [...flag]
      .map((char) =>
        String.fromCharCode(char.codePointAt() - 127397).toLowerCase()
      )
      .join("");

    // Return an image element with the country's flag
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji ? flagemojiToPNG(emoji) : ""}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        {" "}
        <BackButton />{" "}
      </div>
    </div>
  );
}

export default City;
