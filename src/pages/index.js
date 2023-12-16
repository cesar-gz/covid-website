import axios from "axios";
import CountryPieChart from "components/CountryPieChart";
import CovidChart from "components/CovidChart";
import Layout from "components/Layout";
// import Container from "components/Container";
import Map from "components/Map";
import StateCovidChart from "components/StateCovidChart";
import Table from "components/Table";
import VaccinationChart from "components/VaccineChart";
import L from "leaflet";
import { getCurrentLocation, promiseToFlyTo } from "lib/map";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Marker, useMap } from "react-leaflet";

import CovidDailyTable from "../components/CovidDailyTable";
import OrangeCountyFigures from "../components/OrangeCountyFigures";

const locations = {
  csuf: { lat: 33.8823, lng: -117.8851 },
  lac: { lat: 38.9072, lng: -77.0369 },
  current: { lat: 0, lng: 0 },
};

const DEFAULT_ZOOM = 2;
const ZOOM = 10;
const timeToZoom = 2000;

function countryPointToLayer(feature = {}, latlng) {
  const { properties = {} } = feature;
  let updatedFormatted;
  let casesString;

  const { country, updated, cases, deaths, recovered } = properties;

  casesString = `${cases}`;

  if (cases > 1000000) {
    casesString = `${casesString.slice(0, -6)}M+`;
  } else if (cases > 1000) {
    casesString = `${casesString.slice(0, -3)}k+`;
  }

  if (updated) {
    updatedFormatted = new Date(updated).toLocaleString();
  }

  const html = `
    <span class="icon-marker">
      <span class="icon-marker-tooltip">
        <h2>${country}</h2>
        <ul>
          <li><strong>Confirmed:</strong> ${cases}</li>
          <li><strong>Deaths:</strong> ${deaths}</li>
          <li><strong>Recovered:</strong> ${recovered}</li>
          <li><strong>Last Update:</strong> ${updatedFormatted}</li>
        </ul>
      </span>
      ${casesString}
    </span>
  `;

  return L.marker(latlng, {
    icon: L.divIcon({ className: "icon", html }),
    riseOnHover: true,
  });
}

const MapEffect = ({ markerRef }) => {
  const map = useMap();

  useEffect(() => {
    if (!markerRef.current || !map) return;

    (async function run() {
      const options = {
        method: "GET",
        url: "https://disease.sh/v3/covid-19/countries",
      };

      let response;

      try {
        response = await axios.request(options);
      } catch (error) {
        console.error(error);
        return;
      }

      const data = response.data; // for disease.sh
      const hasData = Array.isArray(data) && data.length > 0;

      if (!Array.isArray(data)) {
        console.log("not an array!");
        return;
      }

      if (data.length === 0) {
        console.log("data length is === 0");
      }

      if (!hasData) {
        console.log("No data, sorry!");
        return;
      }

      const geoJson = {
        type: "FeatureCollection",
        features: data.map((country = {}) => {
          const { countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: "Feature",
            properties: {
              ...country,
            },
            geometry: { type: "Point", coordinates: [lng, lat] },
          };
        }),
      };

      const geoJsonLayers = new L.GeoJSON(geoJson, {
        pointToLayer: countryPointToLayer,
      });
      var _map = markerRef.current._map;
      geoJsonLayers.addTo(_map);

      const location = await getCurrentLocation().catch(
        () => locations.current
      );

      setTimeout(async () => {
        await promiseToFlyTo(map, {
          zoom: ZOOM,
          center: location,
        });
      }, timeToZoom);
    })();
  }, [map, markerRef]);

  return null;
};

MapEffect.propTypes = {
  markerRef: PropTypes.object,
};

const IndexPage = () => {
  const markerRef = useRef();
  const [mapCenter, setCenter] = React.useState([
    locations.current.lat,
    locations.current.lng,
  ]);
  const mapSettings = {
    center: mapCenter,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Map {...mapSettings}>
        <MapEffect markerRef={markerRef} />
        <Marker ref={markerRef} position={mapCenter} />
      </Map>
      <div className="inline-charts">
        <div className="row">
          <div className="chart-col">
            <div className="col-content">
              <Table />
            </div>
          </div>
          <div className="chart-col">
            <div className="col-content">
              <CovidDailyTable />
            </div>
          </div>
          <div className="chart-col-1">
            <div className="col-content">
              <h1>Covid Cases Per Country</h1>
              <CountryPieChart />
            </div>
          </div>
        </div>
      </div>
      <h3 className="title-for-graph">Total Global Covid Case Count</h3>
      <CovidChart />
      <br></br>
      <h3 className="title-for-graph">Country Vaccinations Over Time</h3>
      <VaccinationChart />
      <h3 className="title-for-graph">Last Reported Covid Cases Per State</h3>
      <StateCovidChart state="New York" />
      <div>
        <OrangeCountyFigures />
      </div>
    </Layout>
  );
};

export default IndexPage;
