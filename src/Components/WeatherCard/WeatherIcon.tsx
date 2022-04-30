import Clear from "../../assets/Icons/Clear.png";
import Hail from "../../assets/Icons/Hail.png";
import HeavyCloud from "../../assets/Icons/HeavyCloud.png";
import HeavyRain from "../../assets/Icons/HeavyRain.png";
import LightCloud from "../../assets/Icons/LightCloud.png";
import LightRain from "../../assets/Icons/LightRain.png";
import Shower from "../../assets/Icons/Shower.png";
import Sleet from "../../assets/Icons/Sleet.png";
import Snow from "../../assets/Icons/Snow.png";
import Thunderstorm from "../../assets/Icons/Thunderstorm.png";

const WeatherIcon = ({ id, desc }: any) => {
  let iconImg;

  switch (id) {
    // Clear
    case 800:
      iconImg = Clear;
      break;

    // Cloud
    case 801:
    case 802:
      iconImg = LightCloud;
      break;
    case 803:
    case 804:
      iconImg = HeavyCloud;
      break;

    // Rain
    case 500:
    case 501:
    case 520:
    case 521:
    case 511:
      iconImg = LightRain;
      break;
    case 502:
    case 503:
    case 504:
    case 522:
    case 531:
      iconImg = HeavyRain;
      break;

    // Drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      iconImg = Shower;
      break;

    // Thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      iconImg = Thunderstorm;
      break;

    // Snow
    case 600:
    case 601:
    case 602:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      iconImg = Snow;
      break;
    case 611:
      iconImg = Sleet;
      break;

    // Atmosphere
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      iconImg = Hail;
      break;

    default:
      iconImg = Clear;
  }

  return <img className="w-2/3 relative mx-auto" src={iconImg} alt={desc} />;
};

export default WeatherIcon;
