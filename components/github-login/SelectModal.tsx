import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import BuildIcon from '@material-ui/icons/Build';
import GradeIcon from '@material-ui/icons/Grade';

import { useStyles } from './SelectModal.style';

type SelectModalProps = {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
};

export default function SelectModal(props: SelectModalProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      disableBackdropClick
    >
      <DialogTitle className={classes.title} id="simple-dialog-title">
        개발 포지션을 선택해주세요
      </DialogTitle>

      <List className={classes.listContainer}>
        <ListItem
          button
          onClick={() => handleListItemClick('Front-End Developper')}
          key={'Front-End Developper'}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <ImportantDevicesIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'Front-End Developper'} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleListItemClick('Back-End Developper')}
          key={'Back-End Developper'}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <BuildIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'Back-End Developper'} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleListItemClick('Full-Stack Developper')}
          key={'Full-Stack Developper'}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <GradeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'Full-Stack Developper'} />
        </ListItem>
      </List>
    </Dialog>
  );
}
