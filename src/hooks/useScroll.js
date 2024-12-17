import { useState, useEffect, useCallback } from "react";

const useScroll = (initialArray, initialWidth) => {
  const [width, setWidth] = useState(initialWidth || window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeMove, setActiveMove] = useState(null);

  const calculateBoxesPerSlide = useCallback(() => {
    if (width >= 1920) return 6;
    if (width >= 1440 && width < 1920) return 5;
    if (width >= 1280 && width < 1440) return 4;
    if (width >= 854 && width < 1280) return 4;
    if (width >= 700 && width < 854) return 3;
    return 1;
  }, [width]);

  const handleScroll = (move) => {
    const totalBoxes = initialArray.length;

    const maxScrollIndex = () => {
      const boxesPerSlide = calculateBoxesPerSlide();
      return totalBoxes - boxesPerSlide;
    };

    setScrollIndex((prevIndex) => {
      if (move === "prev") return Math.max(prevIndex - 1, 0);
      if (move === "next") return Math.min(prevIndex + 1, maxScrollIndex());
      return prevIndex;
    });

    setActiveMove(move);
    setTimeout(() => {
      setActiveMove(null);
    }, 100);
  };

  const transformValue = () => {
    const boxesPerSlide = calculateBoxesPerSlide();
    const slideWidth = 100 / boxesPerSlide;
    return `translateX(-${scrollIndex * slideWidth}%)`;
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    handleScroll,
    transformValue,
    activeMove,
  };
};

export default useScroll;
