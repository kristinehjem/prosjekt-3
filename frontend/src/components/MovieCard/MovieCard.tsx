import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useAppDispatch } from "../../features/hooks";
import { updateModalInfo } from "../../features/modalInfo";
import "./MovieCard.css";

function MovieCard(props: {
  id: string;
  title: string;
  year: string;
  pictureURL: string;
  rating: string;
  rank: string;
  imdbRatingCount: string;
}) {
  const dispatch = useAppDispatch();

  function clickAct() {
    let ratingValue = localStorage.getItem(props.id);
    //if a person already has given this movie a rating, the rating will be disabled
    let disableRating: boolean = true;
    //if ratingValue is null, the person hasn't given this movie a rating before
    if (ratingValue === null) {
      localStorage.setItem(props.id, "0");
      ratingValue = "0";
      disableRating = false;
      //if ratingValue is 0, the person hasn't given this movie a rating before
    } else if (ratingValue === "0") {
      disableRating = false;
    }

    dispatch(
      updateModalInfo({
        id: props.id,
        title: props.title,
        year: props.year,
        image: props.pictureURL,
        rating: props.rating,
        rank: props.rank,
        imdbRatingCount: props.imdbRatingCount,
        disableRating: disableRating,
        stars: ratingValue,
        showing: true,
      })
    );
  }

  return (
    <div>
      <Card
        className="movieCard"
        sx={{ backgroundColor: "black" }}
        onClick={() => {
          clickAct();
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="120" image={props.pictureURL} />
          <CardContent>
            <Typography
              id="movieTitle"
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: "1.5vw", color: "#FFC069" }}
            >
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default MovieCard;
