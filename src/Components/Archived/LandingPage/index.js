import React from 'react';

import BypassBlocks from '../../BypassBlocks';
import Footer from '../../Footers/Footer';
import Articles from './Articles';
import BrowseCollection from './BrowseCollection';
import BrowseSubjects from './BrowseSubjects';
import HomePageHeader from './Headers/HomePageHeader';
import Introduction from './Introduction';
import Search from './Search';
import Visualizations from './Visualizations';

export default function LandingPage() {
  const mainRef = React.createRef();
  const aboutRef = React.createRef();
  const articlesRef = React.createRef();

  React.useEffect(() => {
    document.title = `DAaaS - Home`;
  });

  return (
    <React.Fragment>
      <BypassBlocks ref={{main: mainRef, about: aboutRef}} />
      <HomePageHeader />
      <main ref={mainRef} tabIndex="-1" >
        <Search />
        <BrowseCollection />
        <Introduction />
        <BrowseSubjects />
        <Visualizations ref={articlesRef}/>
        <Articles ref={articlesRef}/>
      </main>
      <Footer ref={aboutRef} />
    </React.Fragment>
  );
}
