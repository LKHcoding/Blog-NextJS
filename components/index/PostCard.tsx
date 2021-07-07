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
import { MouseEventHandler, useState } from 'react';
import { IAllPostInfoType } from '../../types/AllPostInfoType';
import dayjs from 'dayjs';
import Link from 'next/link';
import removeMD from 'remove-markdown';
import CardActionArea from '@material-ui/core/CardActionArea';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useQuery } from 'react-query';
import { getMyUserDataApi } from '../../utils/queryAPI';
import { useRouter } from 'next/router';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
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
      padding: '4px 16px 4px 4px',
      '& > .MuiCardHeader-avatar': {
        marginRight: '4px',
      },
      '& > .MuiCardHeader-content': {
        overflow: 'hidden',
      },
      '& > .MuiCardHeader-content > .MuiCardHeader-title': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '1rem',
      },
      '& > .MuiCardHeader-content > .MuiCardHeader-subheader': {
        fontSize: '0.75rem',
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
        color: `rgba(0, 0, 0, 0.8)`,
      },
      paddingBottom: '0px',
      '& > .MuiTypography-caption': {
        color: `rgba(0, 0, 0, 0.50)`,
      },
    },
    actionIcons: {
      '& > .actionIcon': {
        padding: '8px',
      },
    },
    tagList: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        marginRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
      },
    },
  })
);
interface Props {
  postInfo: IAllPostInfoType;
}

const PostCardList = ({ postInfo }: Props) => {
  const router = useRouter();
  const { data: myUserData, refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToUserBlog: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (router) {
      router.push(`blog/${postInfo.User.loginID}`);
    }
  };
  return (
    <Card className={classes.root}>
      <Link
        href={`/blog/${postInfo.User.loginID}/${postInfo.id}`}
        as={`/blog/${postInfo.User.loginID}/${postInfo.id}`}
        key={`postcard-${postInfo.id}`}>
        <a>
          <CardHeader
            className={classes.cardHeaderTitle}
            avatar={
              // <Link href={`blog/${postInfo.User.loginID}`} as={`blog/${postInfo.User.loginID}`}>
              //   <a>
              <IconButton onClick={goToUserBlog}>
                <Avatar
                  src={`${postInfo.User.avatarUrl || ''}`}
                  alt={`${postInfo.User.loginID || ''}`}
                  title={`${postInfo.User.loginID || ''}`}
                  aria-label="profile-image"
                  className={classes.avatar}
                />
              </IconButton>
              //   </a>
              // </Link>
            }
            title={`${postInfo.title}`}
            subheader={`${postInfo.User.loginID}`}
          />
          <CardActionArea title={`${postInfo.title}`}>
            {/* <Link
          href={`/blog/${postInfo.User.loginID}/${postInfo.id}`}
          as={`/blog/${postInfo.User.loginID}/${postInfo.id}`}
          key={`postcard-${postInfo.id}`}>
          <a> */}
            <CardMedia
              className={classes.media}
              image={`${process.env.NEXT_PUBLIC_API_URL}/${postInfo.thumbnail}`}
              title={`${postInfo.title}`}
            />
            <CardContent className={classes.postContent}>
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                {removeMD(postInfo.content.slice(0, 300)).replaceAll('\n', ' ')}
              </Typography>
              <Typography variant="caption">
                {`${dayjs(postInfo.updatedAt).format('YYYY년 M월 D일')} • 댓글 0개`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
      <CardActions disableSpacing className={classes.actionIcons}>
        <IconButton aria-label="Like count" className="actionIcon">
          <ThumbUpIcon
            color={
              postInfo.LikeDisLike.filter((like) => like.actionType === 'Like').filter(
                (like) => like.UserId === myUserData?.id
              ).length !== 0
                ? 'action'
                : 'disabled'
            }
          />
        </IconButton>
        <span>{postInfo.LikeDisLike.filter((like) => like.actionType === 'Like').length}</span>
        <IconButton aria-label="DisLike count" className="actionIcon">
          <ThumbDownIcon
            color={
              postInfo.LikeDisLike.filter((dislike) => dislike.actionType === 'DisLike').filter(
                (dislike) => dislike.UserId === myUserData?.id
              ).length !== 0
                ? 'action'
                : 'disabled'
            }
          />
        </IconButton>
        <span>
          {postInfo.LikeDisLike.filter((dislike) => dislike.actionType === 'DisLike').length}
        </span>
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
          {/* <Typography paragraph>간단 설명</Typography> */}
          <div className={classes.tagList}>
            {postInfo &&
              postInfo.Tags.map((item, idx) => (
                <div key={item.tagName + idx}>
                  <Chip
                    size="small"
                    label={item.tagName}
                    clickable
                    color="primary"
                    //  onDelete={handleDelete}
                    //  deleteIcon={<DoneIcon />}
                    variant="outlined"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCardList;
