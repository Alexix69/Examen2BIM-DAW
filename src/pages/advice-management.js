import React, { useEffect, useState } from "react";
import api from "../api/index";
import Advice from "../api/advice";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

//const fetcher = (url) => api.get(url).then((response) => response.data);
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const AdviceManagement = () => {
  const [newAdvice, setNewAdvice] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [favoritesAdvices, setFavoritesAdvices] = useState([]);
  const [input, setInput] = useState("");
  const [adviceToSearch, setAdviceToSearch] = useState("");
  const [searchedAdvices, setSearchedAdvices] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Advice.random();
        setNewAdvice(response.data.slip);
        console.log("respuesta", response.data.slip);
      } catch (e) {
        console.log("Ha ocurrido un error");
      }
    };

    getData();
  }, [refresh]);

  const handleChange = () => {
    setRefresh((prevState) => !prevState);
  };

  const handleAddFavorite = (newFavorite) => {
    setFavoritesAdvices((prevState) => {
      const auxArray = prevState;
      if (!prevState.includes(newFavorite)) {
        auxArray.push(newFavorite);
      }
      return [...auxArray];
    });
  };

  const handleRemoveFavorite = (favoriteToRemove) => {
    setFavoritesAdvices((prevState) => {
      const newArray = prevState;
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i] === favoriteToRemove) {
          newArray.splice(i, 1);
        }
      }
      return [...newArray];
    });
  };

  const handleSearchAdvice = () => {
    console.log("advice to search", input);
    setAdviceToSearch(input);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Advice.search(adviceToSearch);
        console.log("RESPUESTA", response.data.slips);
        setSearchedAdvices(response.data.slips);
      } catch (e) {}
    };

    getData();
  }, [adviceToSearch]);

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4" component="div" gutterBottom>
            Consejo del día
          </Typography>
          {newAdvice ? (
            <Typography variant="h5" component="div" gutterBottom>
              {newAdvice.advice}
            </Typography>
          ) : (
            <Typography variant="h6" component="div" gutterBottom>
              Cargando datos ...
            </Typography>
          )}
          <Grid container spacing={4}>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleAddFavorite(newAdvice.advice)}
              >
                Marcar como favorito
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" variant="contained" onClick={handleChange}>
                <FontAwesomeIcon icon={faSearch} /> Siguiente consejo
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" component="div" gutterBottom>
            Consejos Favoritos
          </Typography>

          {favoritesAdvices.length > 0 ? (
            <>
              {favoritesAdvices.map((favoriteAdvice, index) => (
                <>
                  <Grid container direction="row">
                    <Grid item spacing={2}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {favoriteAdvice}
                      </Typography>
                    </Grid>
                    <Grid item spacing={4}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleRemoveFavorite(favoriteAdvice)}
                      >
                        Quitar de la lista
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ))}
            </>
          ) : (
            <Typography variant="h6" component="div" gutterBottom>
              Aún no has guardado favoritos
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="center" direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            Buscador de consejos
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6" component="div" gutterBottom>
            *Palabra clave:
          </Typography>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" onClick={handleSearchAdvice}>
            <FontAwesomeIcon icon={faSearch} /> Buscar
          </Button>
        </Grid>

        {searchedAdvices.length > 0 ? (
          <Grid item>
            {searchedAdvices.map((searchedAdvice, index) => (
              <>
                {/*<li key={index}>{searchedAdvice.advice}</li>*/}
                <Grid container>
                  <Grid item>
                    <Typography variant="h6" component="div" gutterBottom>
                      {searchedAdvice.advice}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleAddFavorite(searchedAdvice.advice)}
                    >
                      Marcar como favorito
                    </Button>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" component="div" gutterBottom>
            Ingresa una palabra clave para buscar
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default AdviceManagement;
