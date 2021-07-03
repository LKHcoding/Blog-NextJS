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
import { Chip, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    tagList: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
);

const PostList = ({ params }: { params: { BlogUserId: string } }) => {
  const classes = useStyles();

  const { data, refetch } = useQuery(`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`, () =>
    getOneUserPostInfoDataApi.apiCall(params.BlogUserId)
  );

  //순서 최신글이 위로 올라가게 정렬해주기
  data?.sort((a, b) => b.id - a.id);

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
          // <Link
          //   href={{
          //     pathname: '/blog/[BlogUserId]/[postID]',
          //     query: { BlogUserId: `${params.BlogUserId}`, postID: `${item.id}` },
          //   }}
          //   key={item.id}>
          <Link
            // href={`/blog/[BlogUserId]/[postID]`}
            href={`/blog/${params.BlogUserId}/${item.id}`}
            as={`/blog/${params.BlogUserId}/${item.id}`}
            key={item.id}>
            <a style={{ width: '100%' }}>
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
                    className={classes.tagList}
                    style={{
                      display: 'flex',
                      marginLeft: '12px',
                      marginRight: '12px',
                      marginBottom: '12px',
                    }}>
                    {item.Tags.map((item, idx) => (
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
                </CardActionArea>
              </Card>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default PostList;
