import { Link, Typography } from '@material-ui/core';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          paddingTop: '10px',
          // marginTop: '10px',
        }}>
        푸터 입니다.
      </div>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
};

export default Footer;
