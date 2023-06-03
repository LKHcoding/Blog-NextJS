import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme: Theme) =>
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
