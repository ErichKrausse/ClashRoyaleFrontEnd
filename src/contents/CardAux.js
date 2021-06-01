import React from 'react';
import PropTypes from 'prop-types';
import { hexToRgb, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card} style={{backgroundColor: hexToRgb('#333333'), marginLeft: '10%', marginRight:'10%', marginBottom:'5%'}}>
        <CardActionArea>
            <CardMedia
            component="img"
            className={classes.media}
            image={props.picture}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
               {props.name}
            </Typography>
            <Typography component="p"><strong>Elixir Cost</strong>:{props.elixircost} <strong>Rarity</strong>:{props.rarity} <strong>Type</strong>:{props.type} </Typography>
            <Typography component="p">
            <strong>Description</strong>: {props.description}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);