import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";

const ModalWindow = ({ type }) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    setData(null);

    if (type === "character") {
      helpHttp()
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => {
          if (!res.ok) {
            setData(res);
          } else {
            console.log(res);
          }
          setLoader(false);
        });
    }
  }, [id, type]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const gender = (json) => {
    let icon = "";

    switch (json.gender) {
      case "Male":
        icon = <i className="fa-solid fa-mars man"></i>;
        break;
      case "Female":
        icon = <i className="fa-solid fa-venus woman" data-gender="female"></i>;
        break;
      case "Genderless":
        icon = <i className="fa-solid fa-genderless genderless"></i>;
        break;
      case "Unknown":
        icon = <i className="fa-solid fa-question unknown"></i>;
        break;
      default:
    }

    return (
      <td className={json.gender.toLowerCase()}>
        {icon}
        {json.gender.charAt(0).toUpperCase() +
          json.gender.slice(1).toLowerCase()}
      </td>
    );
  };

  const status = (json) => {
    let icon = "";

    switch (json.status) {
      case "Dead":
        icon = <i className="fa-solid fa-skull skull"></i>;
        break;
      case "Alive":
        icon = <i className="fa-solid fa-heart heart"></i>;
        break;
      case "Unknown":
        icon = <i className="fa-solid fa-question"></i>;
        break;
      default:
    }

    return (
      <td className={json.status.toLowerCase()}>
        {icon}
        {json.status.charAt(0).toUpperCase() +
          json.status.slice(1).toLowerCase()}
      </td>
    );
  };

  const species = (json) => {
    let icon = null;

    switch (json.species) {
      case "Human":
        icon = <i className="fa-solid fa-person"></i>;
        break;
      case "Alien":
        icon = <i className="fa-brands fa-reddit-alien"></i>;
        break;
      case "Unknown":
        icon = <i className="fa-solid fa-user-alien"></i>;
        break;
      case "Robot":
        icon = <i className="fa-solid fa-robot"></i>;
        break;
      case "Humanoid":
        icon = <i className="fa-solid fa-person-circle-question"></i>;
        break;
      case "Poopybutthole":
        icon = <i className="fa-solid fa-poo"></i>;
        break;
      case "Mythological Creature":
        icon = <i className="fa-solid fa-book-atlas"></i>;
        break;
      case "Animal":
        icon = <i className="fa-solid fa-dog"></i>;
        break;
      case "Disease":
        icon = <i className="fa-solid fa-square-virus"></i>;
        break;
      default:
        break;
    }

    return (
      <td className={json.species.toLowerCase()}>
        {icon} {json.species}
      </td>
    );
  };

  const origin = (json) => {
    return (
      <td className={`${json.origin.name.toLowerCase()} origin`}>
        {json.origin.name.charAt(0).toUpperCase() +
          json.origin.name.slice(1).toLowerCase()}
      </td>
    );
  };

  return (
    <div className={`modal-window-container ${theme}`}>
      <div className={`modal-window ${theme} info-window`}>
        {loader && <Loader />}
        {data && (
          <>
            <button className="close">
              <i className="fa-solid fa-circle-arrow-left"></i>
            </button>
            <figure className="profile">
              <img src={data.image} alt="" />
              <figcaption>{data.name.toUpperCase()}</figcaption>
            </figure>
            <table className="features">
              <tbody>
                <tr>
                  <th>STATUS</th>
                  {status(data)}
                </tr>
                <tr>
                  <th>GENDER</th>
                  {gender(data)}
                </tr>
                <tr>
                  <th>SPECIES</th>
                  {species(data)}
                </tr>
                <tr>
                  <th>ORIGIN</th>
                  {origin(data)}
                </tr>
                <tr>
                  <th>LOCATION</th>
                  <td className="origin">{data.location.name}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
