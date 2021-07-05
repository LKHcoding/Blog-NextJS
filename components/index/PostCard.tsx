import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import { IAllPostInfoType } from '../../types/AllPostInfoType';
import dayjs from 'dayjs';
import Link from 'next/link';
import removeMD from 'remove-markdown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: '520px',
      width: '100%',
      // minWidth: 300,
      height: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardHeaderTitle: {
      '& > .MuiCardHeader-content': {
        // width: '100%',
        // textOverflow: 'ellipsis',
        overflow: 'hidden',
        // whiteSpace: 'nowrap',
      },
      '& > .MuiCardHeader-content > .MuiCardHeader-title': {
        // width: '100%',

        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
    postContent: {
      '& > p': {
        minHeight: '80px',
        maxHeight: '150px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
      },
      // textOverflow: 'ellipsis',
      //   overflow: 'hidden',
      //   whiteSpace: 'nowrap',
    },
  })
);
interface Props {
  postInfo: IAllPostInfoType;
}

const PostCardList = ({ postInfo }: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeaderTitle}
        avatar={
          <Link href={`blog/${postInfo.User.loginID}`} as={`blog/${postInfo.User.loginID}`}>
            <a>
              <Avatar
                src={`${postInfo.User.avatarUrl || ''}`}
                alt={`${postInfo.User.loginID || ''}`}
                title={`${postInfo.User.loginID || ''}`}
                aria-label="profile-image"
                className={classes.avatar}
              />
            </a>
          </Link>
        }
        // action={
        //   <div>
        //     {/* <IconButton aria-label="settings">
        //      <MoreVertIcon />
        //    </IconButton> */}
        //   </div>
        // }
        title={`${postInfo.title}`}
        subheader={`${postInfo.User.loginID}`}
        // subheader={`${dayjs(postInfo.updatedAt).format('YYYY년 M월 D일')}`}
      />
      <CardMedia
        className={classes.media}
        image={`${process.env.NEXT_PUBLIC_API_URL}/${postInfo.thumbnail}`}
        title={`${postInfo.title}`}
      />
      <CardContent className={classes.postContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          {removeMD(postInfo.content.slice(0, 300)).replaceAll('\n', ' ')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>간단 설명</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCardList;
