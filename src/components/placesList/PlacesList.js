//@flow
import React from "react";
import { Link } from "@reach/router";
import css from "./PlacesList.module.css";

type Props = {
  foundLocations: Array<Object>
}

const List = ({locations}) => {  
  return locations.map(location => {
    const {id, name} = location
    return (
      <li key={id}>
        <Link to={`places/${id}`}>{name}</Link>
      </li>
    )
  })
}

const PlacesList = (props: Props) => {
  const {foundLocations} = props
  return (
    <section className={css.results}>
      <h2 className={css.subtitle}>This is list of search result</h2>
      <ul className={css.foundLocation}>
        <List locations={foundLocations} />
      </ul>
      
    </section>
  );
};

export default PlacesList;
