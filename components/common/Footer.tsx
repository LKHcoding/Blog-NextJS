import { Link, Typography } from '@material-ui/core';
import React from 'react';

const Footer = () => {
  return (
    <>
      <footer
        style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          paddingTop: '25px',
          paddingBottom: '25px',
          // marginBottom: '15px',
          // marginTop: '10px',
        }}>
        {/* 푸터 입니다. */}
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          {/* <Link color="inherit" href="https://github.com/LKHcoding/"> */}
          <a
            href="https://github.com/LKHcoding"
            className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorInherit"
            target="_blank"
            rel="noreferrer">
            {/* <a href="https://github.com/LKHcoding" target="_blank" rel="noreferrer"> */}
            LKHcoding
          </a>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    </>
  );
};

export default Footer;
