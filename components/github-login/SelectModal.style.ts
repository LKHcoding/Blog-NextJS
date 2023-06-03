import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  title: {
    paddingLeft: '30px',
  },
  listContainer: {
    width: '370px',
    paddingLeft: '10px',
  },
});
