import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useObserver from "./hooks/useObserver";

function App() {
  const [observer, setElements, entries] = useObserver({
    threshold: 0.75,
    root: null,
  });

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    });
  }, [entries, observer]);

  useEffect(() => {
    const images = document.querySelectorAll(".lazy");
    setElements(images);
  }, [setElements]);

  const imagePlaceeholder =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
  const images = [
    "http://placekitten.com/g/700/700",
    "http://placekitten.com/g/700/700",
    "http://placekitten.com/g/700/700",
  ];

  return (
    <div className="App">
      <div className="container">
        <h1>UseObserver hook example</h1>
        {images.map((source) => {
          return (
            <img
              key={source}
              className={"lazy"}
              src={imagePlaceeholder}
              alt={"name"}
              data-src={source}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
