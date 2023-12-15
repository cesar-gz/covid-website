import React from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "hooks";

import Layout from "components/Layout";
import Container from "components/Container";

const SecondPage = () => {
  const { companyName, companyUrl, authorName, authorUrl, siteDescription } =
    useSiteMetadata();

  return (
    <Layout pageName="about">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container type="content">
        <h1>About</h1>

        <h2>{companyName}</h2>
        <p>{siteDescription}</p>
        <p>
          <a href={companyUrl}>View on Github</a>
        </p>

        <h2>Created By</h2>
        <p>
          <a href={authorUrl}>{authorName}</a>
        </p>

        <h2>Sources</h2>
<p>
  COVID-19 data is sourced from the following APIs:
</p>
<ol>
  <li>
    <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">
      Open Disease Data API
    </a>{" "}
    by Novel Covid19 API
  </li>
  <li>
    <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">
      COVID-19 Worldwide
    </a>{" "}
    by Novel Covid19 API
  </li>
  <li>
    <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">
      COVID-19 History
    </a>{" "}
    by Novel Covid19 API
  </li>
            <li>
    <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">
      COVID-19 Vaccines Worldwide
    </a>{" "}
    by Novel Covid19 API
   </li>
   <li>
    <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">
      COVID-19 USA
    </a>{" "}
    by Novel Covid19 API
  </li>
  <li>
    <a href="https://api.covidtracking.com" target="_blank" rel="noopener noreferrer">
      COVID Tracking Project API
    </a>{" "}
    by The Covid Tracking Project
  </li>
</ol>
      </Container>
    </Layout>
  );
};

export default SecondPage;
