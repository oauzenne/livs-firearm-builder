"use client";

import React from "react";
import { useBuilder, Component } from "@/context/BuilderContext";
import { useState } from "react";
import Image from "next/image";
import RearSvg from "/public/rear.svg";

const partColors = [
  {
    id: 1,
    name: "Sky Blue",
    price: 158,
    // image: "/rear.svg",
    section: "rear",
    fill: "#95BFC9",
  },
  {
    id: 2,
    name: "Giggling Green",
    price: 685,
    // image: "/rear.svg",
    section: "rear",
    fill: "#B8E38C",
  },
  {
    id: 3,
    name: "Plush Pink",
    price: 268,
    // image: "/rear.svg",
    section: "rear",
    fill: "#F7D9C6",
  },
  {
    id: 4,
    name: "Popping Purple",
    price: 567,
    // image: "/rear.svg",
    section: "rear",
    fill: "#A18FC4",
  },

  // {
  //   id: 5,
  //   name: "Barrel-center",
  //   price: 100,
  //   image: "/images/barrel.png",
  //   section: "center",
  // },
  // {
  //   id: 6,
  //   name: "Stock-center",
  //   price: 200,
  //   image: "/images/stock.png",
  //   section: "center",
  // },
  // {
  //   id: 7,
  //   name: "Scope-center",
  //   price: 300,
  //   image: "/images/scope.png",
  //   section: "center",
  // },
  // {
  //   id: 8,
  //   name: "Scope-center",
  //   price: 300,
  //   image: "/images/scope.png",
  //   section: "center",
  // },

  // {
  //   id: 9,
  //   name: "Barrel-front",
  //   price: 100,
  //   image: "/images/barrel.png",
  //   section: "front",
  // },
  // {
  //   id: 10,
  //   name: "Stock-front",
  //   price: 200,
  //   image: "/images/stock.png",
  //   section: "front",
  // },
  // {
  //   id: 11,
  //   name: "Scope-front",
  //   price: 300,
  //   image: "/images/scope.png",
  //   section: "front",
  // },
  // {
  //   id: 12,
  //   name: "Scope-front",
  //   price: 300,
  //   image: "/images/scope.png",
  //   section: "front",
  // },
];

export default function BuilderPage() {
  const {
    selectComponent,
    totalPrice,
    selectedComponents,
    sectionList,
    rearSelection,
    centerSelection,
    frontSelection,
    setRearSelection,
    setCenterSelection,
    setFrontSelection,
  } = useBuilder();

  const [section, setSection] = useState(0);

  const handleSelect = (
    type: string,
    component: Component,
    section: string
  ) => {
    console.log(component);
    console.log(component.section);
    selectComponent(type, component);
    console.log(type);
    if (component.section === "rear") {
      console.log("rear!");
      setRearSelection(component);
    } else if (section.toLowerCase() === "center") {
      setCenterSelection(component);
    } else if (section.toLowerCase() === "front") {
      setFrontSelection(component);
    }
  };

  const placeholder = "/placeholder.svg";

  const handleNext = () => {
    setSection((prevSection) =>
      prevSection < sectionList.length - 1 ? prevSection + 1 : 0
    );
  };

  const handlePurchase = () => {
    const baseURL = "https://primaryarms.com";
    const rear = rearSelection?.name
      ? encodeURIComponent(rearSelection.name)
      : "default-rear";
    const center = centerSelection?.name
      ? encodeURIComponent(centerSelection.name)
      : "default-center";
    const front = frontSelection?.name
      ? encodeURIComponent(frontSelection.name)
      : "default-front";

    const finalURL = `${baseURL}/${rear}/${center}/${front}`;
    window.location.href = finalURL;
  };

  return (
    <div className="entire-page">
      <div className="page-top">
      <h1>Liv's Firearm Shop</h1>
      <h3>Where protecting yourself is a beautiful thing!</h3>
      <h6>
      <span className="bold-text">Total Price:</span> ${totalPrice}
      </h6>
      </div>
      
      <div className="complete-firearm">
        <Image
          src={placeholder}
          alt="Description of the image"
          className="placeholder-image"
          width={300}
          height={200}
        />
      </div>
      <div className="choose-text">Choose Your {sectionList[section]}'s Color:</div>

      <div className="firearm-container">
        {partColors
          .filter(
            (component) =>
              component.section === sectionList[section].toLowerCase()
          )
          .map((component) => (
            <div
              key={`${component.section}-${component.id}`}
              className="firearm-component"
            >
              <div className="color-circle" style={{ backgroundColor: component.fill }}>
                </div>
{/* if sectionlist = rear then set this color as the rear component etc */}


              {/* <RearSvg
                // xmlns="/rear.svg"
                // viewBox="0 0 24 24"
                width="200"
                height="200"
                fill={component.fill} // Set fill dynamically
              ></RearSvg> */}

              <h3>{component.name}</h3>
              <p>Price: ${component.price}</p>
              <button
                onClick={() =>
                  handleSelect(component.name, component, component.section)
                }
              >
                {section === 0 && rearSelection?.id === component.id
                  ? "Selected"
                  : section === 1 && centerSelection?.id === component.id
                  ? "Selected"
                  : section === 2 && frontSelection?.id === component.id
                  ? "Selected"
                  : "Select"}
              </button>
            </div>
          ))}
        <div>
          {section === 2 ? (
            <button onClick={handlePurchase}>Purchase Configuration</button>
          ) : (
            <button onClick={handleNext}>
              Next: Choose your{" "}
              {sectionList[(section + 1) % sectionList.length]} bundle
            </button>
          )}
        </div>
      </div>

      <div>
        <h2>Selected Components:</h2>
        <ul>
          <li>
            HELLO
            Rear: {rearSelection ? rearSelection.name : "None selected"} - $
            {rearSelection ? rearSelection.price : "0"}
          </li>
          <li>
            Center: {centerSelection ? centerSelection.name : "None selected"} -
            ${centerSelection ? centerSelection.price : "0"}
          </li>
          <li>
            Front: {frontSelection ? frontSelection.name : "None selected"} - $
            {frontSelection ? frontSelection.price : "0"}
          </li>
        </ul>
      </div>
    </div>
  );
}
