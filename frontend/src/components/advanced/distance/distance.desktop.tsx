import React, { useState } from "react";
import { IProps } from "./distance.props";
import { slider } from "../../basic/slider";
import { useRanger, Ranger } from "@tanstack/react-ranger";

const Desktop = (props: IProps) => {
  const [distance, setDistance] = React.useState<ReadonlyArray<number>>([10]);
  const rangerRef = React.useRef<HTMLDivElement>(null);

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values: distance,
    min: 0,
    max: 100,
    stepSize: 1,
    onDrag: (instance: Ranger<HTMLDivElement>) =>
      setDistance(instance.sortedValues),
  });

  return (
    <slider.Track extraClass="slider slider__track desktop" ref={rangerRef}>
      {rangerInstance
        .handles()
        .map(
          (
            {
              value,
              onKeyDownHandler,
              onMouseDownHandler,
              onTouchStart,
              isActive,
            },
            i
          ) => (
            <slider.Thumb
              extraClass="slider__thumb"
              key={i}
              onKeyDown={onKeyDownHandler}
              onMouseDown={onMouseDownHandler}
              onTouchStart={onTouchStart}
              role="slider"
              aria-valuemin={rangerInstance.options.min}
              aria-valuemax={rangerInstance.options.max}
              aria-valuenow={value}
              style={{
                left: `${rangerInstance.getPercentageForValue(value)}%`,
              }}
            >
              <p>{distance}km</p>
            </slider.Thumb>
          )
        )}
    </slider.Track>
  );
};

export default Desktop;
