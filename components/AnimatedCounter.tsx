"use client";
import React from "react";
import CountUp from "react-countup";


interface AnimatedCounterProps {
  count: number;
  duration: number;
  prefix: string;
  decimal: string
}

const AnimatedCounter = ({ count, duration, prefix, decimal }: AnimatedCounterProps) => {
  return (
    <div className="w-full">
      <CountUp end={count} duration={duration} prefix={prefix} decimal={decimal} />
    </div>
  );
};

export default AnimatedCounter;
