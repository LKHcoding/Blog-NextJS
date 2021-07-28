import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React, { useState } from 'react';
import UpdateDialog from '../write/update/UpdateDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    exampleWrapper: {
      position: 'relative',
      // marginTop: theme.spacing(3),
      height: 380,
      '& > div': {
        top: '0px !important',
        left: '0px !important',
      },
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  })
);
interface Props {
  setUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpeedDials({ setUpdateDialogOpen, isMyPost, setDeleteDialogOpen }: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setUpdateDialogOpen(true);
    /**
     * toggle 영역이 아래 버튼들까지 겹쳐있어서 false를 주면 닫히지않음
     */
    setOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    /**
     * toggle 영역이 아래 버튼들까지 겹쳐있어서 false를 주면 닫히지않음
     */
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const toggleBtn = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClick={toggleBtn}
          open={open}
          direction={'down'}>
          {isMyPost && [
            <SpeedDialAction
              key={'수정'}
              icon={<EditIcon />}
              tooltipTitle={'수정'}
              onClick={handleDialogOpen}
              // onClick={() => handleClose}
              tooltipPlacement={'right'}
            />,

            <SpeedDialAction
              key={'삭제'}
              icon={<DeleteForeverIcon />}
              tooltipTitle={'삭제'}
              onClick={handleDeleteDialogOpen}
              tooltipPlacement={'right'}
            />,
          ]}

          <SpeedDialAction
            key={'공유'}
            icon={<ShareIcon />}
            tooltipTitle={'공유'}
            onClick={handleClose}
            tooltipPlacement={'right'}
          />
        </SpeedDial>
      </div>
    </div>
  );
}
