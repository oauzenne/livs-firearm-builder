"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Component = {
  id: number;
  name: string;
  price: number;
  image: string;
  section: string;
};

type BuilderContextType = {
  selectedComponents: Record<string, Component>;
  totalPrice: number;
  selectComponent: (type: string, component: Component) => void;
  setRearSelection: (component: Component) => void;
  setCenterSelection: (component: Component) => void;
  setFrontSelection: (component: Component) => void;
  sectionList: string[];
  rearSelection: Component | null;
  centerSelection: Component | null;
  frontSelection: Component | null;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedComponents, setSelectedComponents] = useState<
    Record<string, Component>
  >({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [rearSelection, setRearSelection] = useState<Component | null>(null);
  const [centerSelection, setCenterSelection] = useState<Component | null>(
    null
  );
  const [frontSelection, setFrontSelection] = useState<Component | null>(null);

  const selectComponent = (type: string, component: Component) => {
    setSelectedComponents((prev) => {
      const updatedComponents = { ...prev, [type]: component };
      console.log(component);
      console.log(rearSelection);

      const updatedPrice =
        (component.section === "rear"
          ? component.price
          : rearSelection?.price || 0) +
        (component.section === "center"
          ? component.price
          : centerSelection?.price || 0) +
        (component.section === "front"
          ? component.price
          : frontSelection?.price || 0);

      console.log(updatedPrice);
      setTotalPrice(updatedPrice);
      return updatedComponents;
    });
  };

  const sectionList = ["Rear", "Center", "Front"];

  return (
    <BuilderContext.Provider
      value={{
        selectedComponents,
        totalPrice,
        selectComponent,
        sectionList,
        rearSelection,
        centerSelection,
        frontSelection,
        setRearSelection,
        setCenterSelection,
        setFrontSelection,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};
