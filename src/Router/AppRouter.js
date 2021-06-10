import {ThemeProvider} from '@material-ui/styles';
import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import OldLandingPage from '../Components/Archived/LandingPage';
import ConfidentialTablePage from '../Components/Archived/ResultsDetails/ConfidentialTablePage';
import ContentPage from '../Components/Archived/ResultsDetails/ContentPage';
import DocumentPage from '../Components/Archived/ResultsDetails/DocumentPage';
import PublicTablePage from '../Components/Archived/ResultsDetails/PublicTablePage';
import VisualizationPage from '../Components/Archived/ResultsDetails/VisualizationPage';
import SplashPageArchived from '../Components/Archived/SplashPage';
import CreateAccountPage from '../Components/Archived/CreateAccountPage';
import ForgotPassword from '../Components/Archived/ForgotPasswordPage';
import NotFound from '../Components/NotFound';
import ProjectsPage from '../Components/ProjectsPage';
import ResultsPage from '../Components/Archived/ResultsPage';
import SignInPage from '../Components/Archived/SignInPage';
import SplashPage from '../Components/Archived/SplashPagev2';
import VettingRequestResearcher from '../Components/VettingApp/VettingRequestResearcher';
import DashboardPageResearcher from '../Components/VettingApp/Dashboard/DashboardPageResearcher';
import DashboardPageAnalyst from '../Components/VettingApp/Dashboard/DashboardPageAnalyst';
import PowerShell from '../Components/VDLPowerShellIntake/Request';
import SuccessfulSubmission from '../Components/VDLPowerShellIntake/Request/SuccessfulSubmission';
import LandingPage from '../Components/Portal/LandingPage';

import {useStyles} from '../Theme/globalStyles';
import {theme} from '../Theme/theme';
import Index from './Index';
import VettingRequestAnalyst from '../Components/VettingApp/VettingRequestAnalyst';

export default function AppRouter() {
  useStyles();

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          {/* PROTOTYPE ONLY */}
          <Route path="/" component={Index} exact={true} />
          <Route path="/home" component={LandingPage} />
          <Route
            path="/VDLPowerShellIntake"
            component={PowerShell}
            exact={true}
          />
          <Route
            path="/Powershell/SuccessfulSubmission"
            component={SuccessfulSubmission}
            exact={true}
          />
          <Route
            path="/vetting-app/dashboard-researcher"
            component={DashboardPageResearcher}
          />
          <Route
            path="/vetting-app/dashboard-analyst"
            component={DashboardPageAnalyst}
          />
          <Route
            path="/vetting-app/request-researcher"
            component={VettingRequestResearcher}
          />
          <Route
            path="/vetting-app/request-analyst-assigned"
            render={() => (
              <VettingRequestAnalyst
                userName="Tony Stark"
                lead="Tony Stark"
                support={['']}
              />
            )}
          />
          <Route
            path="/vetting-app/request-analyst-unassigned"
            render={() => (
              <VettingRequestAnalyst
                userName="Tony Stark"
                lead=""
                support={[]}
              />
            )}
          />
          {/* Routes for archived pages */}
          <Route
            path="/archived/results"
            component={ResultsPage}
            exact={true}
          />
          <Route path="/archived/home" component={OldLandingPage} />
          <Route path="/archived/splashv2" component={SplashPage} />
          <Route path="/archived/splash" component={SplashPageArchived} />
          <Route path="/archived/results/content" component={ContentPage} />
          <Route path="/archived/results/doc" component={DocumentPage} />
          <Route path="/archived/projects" component={ProjectsPage} />
          <Route path="/archived/sign-in" component={SignInPage} exact={true} />
          <Route
            path="/archived/sign-in/verify-identity"
            component={ForgotPassword}
          />
          <Route
            path="/archived/sign-in/create-account"
            component={CreateAccountPage}
          />
          <Route
            path="/archived/results/table-conf"
            component={ConfidentialTablePage}
          />
          <Route
            path="/archived/results/table-pub"
            component={PublicTablePage}
          />
          <Route path="/archived/results/vis" component={VisualizationPage} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </HashRouter>
  );
}
