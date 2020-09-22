import {ThemeProvider} from '@material-ui/styles';
import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import LandingPage from '../Components/Archived/LandingPage';
// Archived pages
import ConfidentialTablePage from '../Components/Archived/ResultsDetails/ConfidentialTablePage';
import ContentPage from '../Components/Archived/ResultsDetails/ContentPage';
import DocumentPage from '../Components/Archived/ResultsDetails/DocumentPage';
import PublicTablePage from '../Components/Archived/ResultsDetails/PublicTablePage';
import VisualizationPage from '../Components/Archived/ResultsDetails/VisualizationPage';
import SplashPageArchived from '../Components/Archived/SplashPage';
import CreateAccountPage from '../Components/CreateAccountPage';
import ForgotPassword from '../Components/ForgotPasswordPage';
import NotFound from '../Components/NotFound';
import ProjectsPage from '../Components/ProjectsPage';
import ResultsPage from '../Components/ResultsPage';
import SignInPage from '../Components/SignInPage';
import SplashPage from '../Components/SplashPage';
import {useStyles} from '../Theme/globalStyles';
import {theme} from '../Theme/theme';
import Index from './Index';

import VettingRequestResearcher from '../Components/VettingApp/VettingRequestResearcher';

export default function AppRouter() {
  useStyles();

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          {/* FIX THISSSSSSSs*/}
          <Route path="/" component={VettingRequestResearcher} exact={true} />
          <Route path="/index" component={Index} /> {/* PROTOTYPE ONLY */}
          <Route path="/sign-in" component={SignInPage} exact={true}/>
          <Route path="/sign-in/verify-identity" component={ForgotPassword} />
          <Route path="/sign-in/create-account" component={CreateAccountPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/results" component={ResultsPage} exact={true} />

          {/* Routes for archived pages */}
          <Route path="/archived/home" component={LandingPage} />
          <Route path="/archived/splash" component={SplashPageArchived} />
          <Route path="/archived/results/content" component={ContentPage} />
          <Route path="/archived/results/doc" component={DocumentPage} />
          <Route path="/archived/results/table-conf" component={ConfidentialTablePage} />
          <Route path="/archived/results/table-pub" component={PublicTablePage} />
          <Route path="/archived/results/vis" component={VisualizationPage} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </HashRouter>
  );
}
