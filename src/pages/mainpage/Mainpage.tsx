import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import requests from "../../api/weatherAPI/requests";
import axios from "axios";
import * as S from "./style";
import TImeSlider from "../../components/mainpage/TimeSlider";
import SubSlider from "../../components/mainpage/SubSlider";
import WindowBox from "../../components/mainpage/WindowBox";
import ClothesBoxs from "../../components/mainpage/ClothesBoxs";
import NalaldolBox from "../../components/mainpage/NalaldolBox";
import {
  ApiNowModel,
  ApiVilageFuture,
  DefaultNowModel,
} from "../../model/apiModel";
import {
  DefaultCity,
  DefaultGu,
  DefaultNx,
  DefaultNy,
  FormattedDate,
  FormattedNowDate,
  FormattedTime,
} from "../../utils/weatherInfo";
import Loading from "../loading/Loading";
import Snow from "../../components/falling/Snow";

const Mainpage: React.FC = () => {
  const location = useLocation();

  const city: string = DefaultCity(location.state);
  const gu: string = DefaultGu(location.state);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nx, setNx] = useState<number>(DefaultNx(location.state));
  const [ny, setNy] = useState<number>(DefaultNy(location.state));
  const [vilageData, setVilageData] = useState<ApiVilageFuture[]>([]);
  const [nowData, setNowData] = useState<ApiNowModel | undefined>();
  const [doldol, setDoldol] = useState<string>("");

  console.log("nx: " + nx + " ny: " + ny + " city: " + city + " gu: " + gu);

  useEffect(() => {
    fetchFutureData();
    fetchUltraNow();
  }, []);

  // axios instance 정의 -------------------------------------------------
  // 단기예보 오픈 API
  const futureInstance = axios.create({
    baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/",
    params: {
      ServiceKey: import.meta.env.VITE_APP_WEARTHER_API_KEY,
      pageNo: "1",
      numOfRows: "288",
      dataType: "JSON",
      base_date: FormattedDate,
      base_time: "2300",
      nx: nx.toString(),
      ny: ny.toString(),
    },
  });
  // 초단기실황 오픈 API
  const nowInstance = axios.create({
    baseURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/",
    params: {
      ServiceKey: import.meta.env.VITE_APP_WEARTHER_API_KEY,
      pageNo: "1",
      numOfRows: "5",
      dataType: "JSON",
      base_date: FormattedNowDate,
      base_time: FormattedTime,
      nx: nx.toString(),
      ny: ny.toString(),
    },
  });

  // axios fetch 함수 정의 -------------------------------------------------
  // 단기예보 오픈 API
  const fetchFutureData = async () => {
    try {
      const response = await futureInstance.get(requests.fetchVilageFuture);
      const { item } = response.data.response.body.items;

      setVilageData(item);
      setNx(item[0].nx);
      setNy(item[0].ny);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // 초단기실황 오픈 API
  const fetchUltraNow = async () => {
    try {
      const response = await nowInstance.get(requests.fetchUltraNow);
      const res = response.data.response.body.items.item;

      const realtimeData = res.find(
        (res: ApiNowModel) => res.category === "T1H"
      );

      // console.log(response);

      setNowData(realtimeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <S.MainpageWrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Snow style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }} />
            <TImeSlider vilageData={vilageData} />
            <SubSlider vilageData={vilageData} />
            <WindowBox
              vilageData={vilageData}
              nowData={nowData === undefined ? DefaultNowModel : nowData}
              city={city}
              gu={gu}
            />
            <ClothesBoxs
              nowData={nowData === undefined ? DefaultNowModel : nowData}
              setDoldol={setDoldol}
            />
            <NalaldolBox
              vilageData={vilageData}
              doldol={doldol}
              nowData={nowData === undefined ? DefaultNowModel : nowData}
            />
          </>
        )}
      </S.MainpageWrapper>
    </>
  );
};

export default Mainpage;
