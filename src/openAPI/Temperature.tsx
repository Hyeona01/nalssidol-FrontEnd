import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import requests from "../api/weatherAPI/requests";
import axios from "axios";
import { ApiNowModel, ApiVilageFuture, positionType } from "../model/apiModel";
import {
  DefaultCity,
  DefaultGu,
  DefaultPosition,
  FormattedDate,
  FormattedNowDate,
  FormattedTime,
} from "../utils/weatherInfo";

const Temperature = () => {
  const location = useLocation();

  const city: string = DefaultCity(location.state);
  const gu: string = DefaultGu(location.state);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [position, setPosition] = useState<positionType>({ x: 60, y: 127 });
  const [vilageData, setVilageData] = useState<ApiVilageFuture[]>([]);
  const [nowData, setNowData] = useState<ApiNowModel | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFutureData();
      await fetchUltraNow();
      await DefaultPosition().then((result) => setPosition(result));
      setIsLoading(false);
    };

    fetchData();
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
      nx: position.x.toString(),
      ny: position.y.toString(),
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
      nx: position.x.toString(),
      ny: position.y.toString(),
    },
  });

  // axios fetch 함수 정의 -------------------------------------------------
  // 단기예보 오픈 API
  const fetchFutureData = async () => {
    try {
      const response = await futureInstance.get(requests.fetchVilageFuture);
      const { item } = response.data.response.body.items;

      setVilageData(item);
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
    <div>
      <div>x좌표 : {position.x}</div>
      <div>y좌표 : {position.y}</div>
      <div>시 : {city}</div>
      <div>구 : {gu}</div>
      <div>어제 날짜 : {FormattedDate}</div>
      <div>오늘 날짜 : {FormattedNowDate}</div>
      <div>현재 시간 : {FormattedTime}</div>
    </div>
  );
};

export default Temperature;
