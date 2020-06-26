import {Breadcrumbs, Button, Container, Divider, Grid, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImageIcon from '@material-ui/icons/Image';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import Footer from '../../Footers/Footer';
import DefaultHeader from '../../Headers/DefaultHeader';
import {ContactUs, Source} from './CommonComponents/Contact';
import {RelatedInfo, RelatedNews} from './CommonComponents/RelatedContent';
import SignUp from './CommonComponents/SignUp';

const useStyles = makeStyles((theme) => ({
  title: {
    maxWidth: '60em',
  },
  content: {
    '& img': {
      width: '100%',
    },
    '& p': {
      maxWidth: '60em',
      marginBottom: theme.spacing(2),
    },
    '& table p': {
      marginBottom: 0,
    },
  },
  downloadBtn: {
    width: '80%',
    marginBottom: theme.spacing(6),
    marginLeft: '10%',
  },
}));

export default function DocumentPage(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DefaultHeader />
      <Container maxWidth="xl" className="page-container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/">
          Home
          </Link>
          <Link component={RouterLink} to="/results">
          Energy
          </Link>
          <Typography>Information</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <div className="icon-heading">
              <Typography variant="h4" component="span">
                <ImageIcon fontSize="large" />
              </Typography>
              <Typography
                variant="h4"
                component="h1"
                className={classes.title}
                gutterBottom
              >
              Canada’s Energy Future 2018: Energy Supply and Demand Projections
              to 2040
              </Typography>
            </div>
            <section className={classes.content}>
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <img
                    src={process.env.PUBLIC_URL + '/images/mg-01-eng.jpg'}
                    alt=""
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ac venenatis purus, vel scelerisque odio. Duis sed accumsan
                  risus. Quisque eget dui odio. Sed orci urna, finibus rhoncus
                  nulla eu, pretium pretium ex. Morbi non urna consectetur,
                  condimentum purus vitae, imperdiet lectus. Duis aliquet
                  pulvinar mattis. Duis tincidunt elementum vestibulum.
                  Curabitur iaculis maximus felis vel condimentum. Duis at ante
                  ut neque placerat molestie. Aenean hendrerit consectetur nisl,
                  at mollis ipsum. Donec efficitur ipsum mi, et finibus nisi
                  iaculis vel. Pellentesque justo urna, dignissim eget commodo
                  in, molestie nec tortor.
                  </Typography>
                  <Typography>
                  Aliquam dui tortor, fermentum dapibus varius in, interdum et
                  tortor. Vivamus aliquet ornare eros, sed fringilla ipsum
                  tempus id. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia Curae; Mauris eget nisl
                  turpis. Pellentesque sagittis massa vel sollicitudin
                  tincidunt. Nullam non odio id tellus imperdiet vulputate. Nam
                  cursus, lectus eget facilisis malesuada, augue mi blandit
                  arcu, laoreet tincidunt mi lectus nec odio. Aenean congue
                  faucibus accumsan. Sed dignissim ipsum lectus, fermentum
                  pellentesque quam volutpat ac. Maecenas tincidunt neque sit
                  amet molestie tempor. Vestibulum a leo ornare, placerat quam
                  egestas, finibus lectus. Quisque ac dolor eu nisl lobortis
                  condimentum. Maecenas et consequat massa.
                  </Typography>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Typography>Published:</Typography>
                        </td>
                        <td>
                          <Typography>2019-12-01</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Collection cycle:</Typography>
                        </td>
                        <td>
                          <Typography>Quarterly</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>Related geography:</Typography>
                        </td>
                        <td>
                          <Typography>Alberta only</Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </section>
            <section>
              <Typography
                variant="h5"
                component="h2"
                className="heading-underline"
                gutterBottom
              >
              Additional formats
              </Typography>
              <ul>
                <li>
                  <Link>
                    <Typography>format 1</Typography>
                  </Link>
                </li>
                <li>
                  <Link>
                    <Typography>format 2</Typography>
                  </Link>
                </li>
              </ul>
            </section>
          </Grid>
          <Grid item xs={3}>
            <Button
              className={classes.downloadBtn}
              color="primary"
              variant="contained"
              startIcon={<GetAppIcon />}
            >
            Download
            </Button>
            <Source />
            <RelatedInfo />
          </Grid>
        </Grid>
        <RelatedNews />
        <Divider className="section-divider" />
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <ContactUs />
          </Grid>
          <Grid item xs={5}>
            <SignUp />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </ React.Fragment>
  );
}
