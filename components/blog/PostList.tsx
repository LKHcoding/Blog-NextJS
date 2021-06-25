import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-query';
import { getOneUserPostInfoDataApi } from '../../utils/queryAPI';
import removeMD from 'remove-markdown';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // padding: '100px',
    // margin: '50px',
    // maxWidth: 345,

    marginBottom: '20px',
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 4px rgb(0 0 0 / 8%)`,
    // boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
  },
  media: {
    // width: '100%',
    // height: '100%',
    // paddingTop: '56.25%', // 16:9
    paddingTop: '56.25%', // 16:9
    height: 0,
  },
});

export const PostList = ({ params }: { params: { loginID: string } }) => {
  const { data, refetch } = useQuery(`${getOneUserPostInfoDataApi.key}-${params.loginID}`, () =>
    getOneUserPostInfoDataApi.apiCall(params.loginID)
  );

  //순서 최신글이 위로 올라가게 정렬해주기
  data?.sort((a, b) => b.id - a.id);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        marginLeft: '100px',
        marginBottom: '30px',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {data &&
        data.map((item) => (
          <Link
            href={{
              pathname: '/blog/[loginID]/[postID]',
              query: { loginID: `${params.loginID}`, postID: `${item.id}` },
            }}
            key={item.id}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`${process.env.NEXT_PUBLIC_API_URL}/${item.thumbnail.replaceAll(
                    '\\',
                    '/'
                  )}`}
                  title={`${item.title}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {removeMD(item.content.slice(0, 250)).replaceAll('\n', ' ')} ...
                  </Typography>
                </CardContent>
                <div
                  style={{
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                  }}>
                  {item.Tags.map((item, idx) => (
                    <Button
                      key={item.tagName + idx}
                      size="small"
                      style={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        marginRight: '9px',
                        backgroundColor: '#f1f1f1',
                        boxShadow:
                          '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 2px rgb(0 0 0 / 12%)',
                      }}
                      variant="contained">
                      <Typography variant="body2" color="textPrimary" component="p">
                        {item.tagName}
                      </Typography>
                    </Button>
                  ))}
                </div>
              </CardActionArea>
            </Card>
          </Link>
        ))}
    </div>
  );
};
