import React from "react";
import { Hero } from "../../Components/Hero/Hero";
import { Popular } from "../../Components/Popular/Popular";
import { Offers } from "../../Components/Offers/Offers";
import { NewCollections } from "../../Components/NewCollections/NewCollections";
import { NewsLetter } from "../../Components/NewsLetter/NewsLetter";
import Slider from "../../Components/Slider/Slider";

export default function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Slider />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
}
