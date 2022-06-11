import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useMediaQuery } from "@material-ui/core";

import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";
import SelectionBox from "../../Components/SelectionBox/SelectionBox.jsx";

import { setSelfHosted } from "../../redux/Actions/login.js";

import vocascanRound from "../../images/logo/color-round.svg";
import vocascanCloud from "../../images/logo/vocascan-cloud.svg";

import "./SelectionScreen.scss";
import "swiper/modules/effect-cards/effect-cards.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/swiper.scss";

import { Navigation, EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

const SelectionScreen = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isMdScreen = useMediaQuery("(max-width: 768px)");

  const handleSubmit = useCallback(
    (selfHosted) => {
      dispatch(setSelfHosted({ selfHosted }));
    },
    [dispatch]
  );

  const selectionBoxes = [
    <SelectionBox
      key={0}
      heading={t("screens.selectionScreen.vocascanCloud.heading")}
      pro={t("screens.selectionScreen.vocascanCloud.pro", {
        returnObjects: true,
      })}
      contra={t("screens.selectionScreen.vocascanCloud.contra", {
        returnObjects: true,
      })}
      buttonText={t("screens.selectionScreen.vocascanCloud.button")}
      image={vocascanCloud}
      important
      onSubmit={() => handleSubmit(false)}
    />,
    <SelectionBox
      key={1}
      heading={t("screens.selectionScreen.vocascanServer.heading")}
      pro={t("screens.selectionScreen.vocascanServer.pro", {
        returnObjects: true,
      })}
      contra={t("screens.selectionScreen.vocascanServer.contra", {
        returnObjects: true,
      })}
      buttonText={t("screens.selectionScreen.vocascanServer.button")}
      image={vocascanRound}
      onSubmit={() => handleSubmit(true)}
    />,
  ];

  return (
    <UnauthenticatedLayout>
      {isMdScreen ? (
        <Swiper modules={[Navigation, EffectCards]} navigation effect="cards">
          {selectionBoxes.map((box, i) => (
            <SwiperSlide key={i}>{box}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="select-srn-wrapper">
          <div className="boxes">{selectionBoxes}</div>
        </div>
      )}
    </UnauthenticatedLayout>
  );
};

export default SelectionScreen;
