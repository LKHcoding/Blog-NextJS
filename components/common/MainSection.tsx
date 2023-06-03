import React, { FC, ReactNode } from 'react';
import Footer from './Footer';
import { useStyles } from './MainSection.style';

type MainSectionProps = {
  children: ReactNode;
};

const MainSection: FC<MainSectionProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div>{children}</div>

      <Footer />
    </main>
  );
};

export default MainSection;
