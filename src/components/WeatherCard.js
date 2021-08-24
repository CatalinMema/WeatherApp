import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import styled from "styled-components";
import { RiWindyLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { RiTempHotFill } from "react-icons/ri";
import { TiWeatherShower } from "react-icons/ti";
import ChartPopup from "./ChartPopup";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStylesModal = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 2000,
    backgroundColor: "white",
    borderRadius: "1em",
    // border: '2px solid white',
    outline: "none",
    padding: theme.spacing(0, 2, 2),
  },
}));
// padding: 3em;
//     border-radius: 2em;
//     box-shadow: 16px 20px 20px 0px black;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
    borderRadius: "2em",
    boxShadow: "16px 20px 20px 0px black",
    minWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function WeatherCard({
  wind,
  lati,
  long,
  description,
  date,
  humidity,
  temperature,
  icon,
  pressure,
  feels_like,
  result,
}) {
  const classes = useStyles();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [day, setDay] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const classesModal = useStylesModal();
  const handleOpen = (date) => {
    setDay(date);
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const temperatureData = result.filter(
    (day) => day.dt_txt.slice(0, 10) === date.slice(0, 10)
  );
  let minValueList = [];
  let maxValueList = [];
  temperatureData.forEach((item) => {
    minValueList.push(item.main.temp_min);
    maxValueList.push(item.main.temp_max);
  });

  return (
    <AllCard>
      <Card
        onClick={() => handleOpen(date.slice(0, 10))}
        className={classes.root}
      >
        <Day>
          <h3>{days[new Date(date.slice(0, 10)).getDay()]}</h3>
        </Day>

        {/* Min: {Math.floor(temp_min)} &#8451;/Max: {Math.ceil(temp_max)} &#8451; */}

        <TempImgContainer>
          <div>
            {Math.round(Math.min.apply(null, minValueList))}&#8451; -{" "}
            {Math.round(Math.max.apply(null, maxValueList))}&#8451;
          </div>
          <ImageContainer>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=""
            />
            <span>{description}</span>
          </ImageContainer>
        </TempImgContainer>

        <CardContent>
          <WeatherInfo>
            <InfoPart>
              <RiWindyLine size="1.5em" />
              <Info>
                <p>{wind} km/h </p>
                <p> Wind</p>
              </Info>
            </InfoPart>
            <InfoPart>
              <WiHumidity size="1.5em" />
              <Info>
                <p>{humidity} </p>
                <p> Humidity</p>
              </Info>
            </InfoPart>
            <InfoPart>
              <RiTempHotFill size="1.5em" />
              <Info>
                <p>{feels_like}&#8451;</p>
                <p> Feels like</p>
              </Info>
            </InfoPart>
            <InfoPart>
              <TiWeatherShower size="1.5em" />
              <Info>
                <p>{pressure} </p>
                <p>Pressure</p>
              </Info>
            </InfoPart>
          </WeatherInfo>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classesModal.paper}>
          <CloseOption>
            <CloseIcon onClick={handleClose} />
          </CloseOption>

          <ChartPopup
            day={days[new Date(date.slice(0, 10)).getDay()]}
            result={result}
            long={long}
            lati={lati}
            date={day}
          />
        </div>
      </Modal>
    </AllCard>
  );
}

const AllCard = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const Day = styled.div`
  display: flex;
  justify-content: space-evenly;
  > h3 {
    padding-top: 0.5em;
  }
  > .MuiSvgIcon-root:hover {
    cursor: pointer;
  }
`;

const TempImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Info = styled.div`
  > p {
    font-size: 13px;
    padding-left: 10px;
  }
`;

const InfoPart = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1em;
  margin-bottom: 1em;
`;

const CloseOption = styled.div`
  display: flex;
  justify-content: flex-end;
  > .MuiSvgIcon-root {
    margin-top: 1em;
  }
  > .MuiSvgIcon-root:hover {
    cursor: pointer;
  }
`;
