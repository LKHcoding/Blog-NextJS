import React, { useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { DropzoneArea } from 'material-ui-dropzone';

import Draggable from 'react-draggable';
import { useQueryClient } from '@tanstack/react-query';

import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import toast from 'utils/toast';
import { useStyles } from './UpdateUploadDialog.style';
import {
  getAllPostInfoApi,
  getOneUserPostInfoDataApi,
  getOneUserTagInfoDataApi,
  getPostInfoDataApi,
} from 'utils/queryAPI';

type UpdateUploadDialogProps = {
  handleSave: (file: File[]) => Promise<'success' | undefined>;
  conditionSave: boolean;
  handleSaveWithOutThumbnail: () => Promise<'success' | undefined>;
  postId: number | null;
  isUpdate?: boolean;
};
const UpdateUploadDialog = ({
  handleSave,
  conditionSave,
  handleSaveWithOutThumbnail,
  postId,
  isUpdate = false,
}: UpdateUploadDialogProps) => {
  const classes = useStyles();

  const queryClient = useQueryClient();
  const { data } = useGetUsers();

  const [canSave, setCanSave] = useState(false);
  const [open, setOpen] = useState(false);
  const imageFile = useRef<File[]>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    if (imageFile.current) {
      if (imageFile.current.length > 0) {
        const result = await handleSave(imageFile.current);
        if (result === 'success') {
          await queryClient.invalidateQueries([
            `${getOneUserTagInfoDataApi.key}-${data?.loginID}`,
          ]);
          await queryClient.invalidateQueries([
            `${getOneUserPostInfoDataApi.key}-${data?.loginID}`,
          ]);
          await queryClient.invalidateQueries([`${getAllPostInfoApi.key}`]);
          await queryClient.invalidateQueries([
            `${getPostInfoDataApi.key}-${postId}`,
          ]);

          toast.info(`수정이 완료되었습니다.`);

          setOpen(false);
        }
      }
    }
  };

  const handleUploadWithOutThumbnail = async () => {
    const result = await handleSaveWithOutThumbnail();
    if (result === 'success') {
      await queryClient.invalidateQueries([
        `${getOneUserTagInfoDataApi.key}-${data?.loginID}`,
      ]);
      await queryClient.invalidateQueries([
        `${getOneUserPostInfoDataApi.key}-${data?.loginID}`,
      ]);
      await queryClient.invalidateQueries([`${getAllPostInfoApi.key}`]);
      await queryClient.invalidateQueries([`${getPostInfoDataApi.key}-${postId}`]);

      toast.info(`수정이 완료되었습니다.`);

      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        disabled={conditionSave}
        autoFocus
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
      >
        save
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
          Thumbnail - Image
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            작성한 게시글을 대표하는 썸네일 이미지를 업로드 후 완료 버튼을 눌러
            주세요😀 (추천: 16:9)
          </DialogContentText>

          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={'Drag and drop an image here or Click!'}
            filesLimit={1}
            showFileNames
            maxFileSize={5 * 1024 * 1024} // 5MB
            onChange={(files) => {
              imageFile.current = files;
              files.length === 0 ? setCanSave(false) : setCanSave(true);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.cancelButton}
            onClick={handleClose}
            color="primary"
          >
            취소
          </Button>

          {isUpdate && (
            <Button
              className={classes.noChangeButton}
              disabled={canSave}
              onClick={handleUploadWithOutThumbnail}
              variant="outlined"
              color="primary"
            >
              변경없음
            </Button>
          )}
          <Button
            disabled={!canSave}
            autoFocus
            className={classes.completeButton}
            variant="outlined"
            onClick={handleUpload}
            color="primary"
          >
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateUploadDialog;

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
