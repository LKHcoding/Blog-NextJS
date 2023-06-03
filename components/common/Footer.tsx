import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './Footer.style';

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <a
          href="https://github.com/LKHcoding"
          className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorInherit"
          target="_blank"
          rel="noreferrer"
        >
          LKHcoding
        </a>
        {` ${new Date().getFullYear()}.`}
      </Typography>
    </footer>
  );
};

export default Footer;
