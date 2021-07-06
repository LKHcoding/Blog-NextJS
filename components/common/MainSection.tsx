import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      minWidth: 0,
      // padding: theme.spacing(3),
    },
  })
);

const MainSection: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ marginTop: '10px' }}>{children}</div>

      <Footer />

      {/* 경로에 따라 Footer를 안보여주려면 이렇게 */}
      {/* {router.pathname !== '/blog/write' && <Footer />} */}
    </main>
  );
};

export default MainSection;
