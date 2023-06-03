import React, { useState } from 'react';
import { useRouter } from 'next/router';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import toast from 'utils/toast';

import { useStyles } from './ActionButton.style';

type ActionButtonProps = {
  setUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ActionButton({
  setUpdateDialogOpen,
  isMyPost,
  setDeleteDialogOpen,
}: ActionButtonProps) {
  const router = useRouter();

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setUpdateDialogOpen(true);
    setOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    setOpen(false);
  };

  const handleCopyToClipboard = () => {
    if (document.queryCommandSupported('copy')) {
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`)
        .then(() => {
          toast.info(`클립보드에 주소가 복사 되었습니다.`);
        })
        .catch((err) => {
          toast.error(`err : ${err}`);
        });
    } else {
      toast.info(`클립보드 복사가\n지원되지 않는 브라우저 입니다.`);
    }

    setOpen(false);
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
          direction={'down'}
        >
          {isMyPost && [
            <SpeedDialAction
              key={'수정'}
              icon={<EditIcon />}
              tooltipTitle={'수정'}
              onClick={handleDialogOpen}
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
            key={'클립보드에 주소 복사'}
            icon={<ShareIcon />}
            tooltipTitle={'클립보드에 주소 복사'}
            onClick={handleCopyToClipboard}
            tooltipPlacement={'right'}
          />
        </SpeedDial>
      </div>
    </div>
  );
}
