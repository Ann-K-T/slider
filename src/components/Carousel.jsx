import { useEffect, useState } from 'react';
import { shortList, list, longList } from '../data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const Carousel = () => {
  // HOOKS ==> useState
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [people, setPeople] = useState(longList);
  // END OF HOOKS ==> useState

  //HOOKS ==> useEffect
  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPersonIndex]);

  //END OF HOOKS ==> useEffect

  //FUNCTIONS
  const prevSlide = () => {
    setCurrentPersonIndex((oldIndex) => {
      const result = (oldIndex - 1 + people.length) % people.length;
      return result;
    });
  };
  const nextSlide = () => {
    setCurrentPersonIndex((oldIndex) => {
      const result = (oldIndex + 1) % people.length;
      return result;
    });
  };

  //END OF FUNCTIONS

  //RETURN JSX
  return (
    <section className="slider-container">
      {people.map(({ id, image, name, title, quote }, index) => {
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (index - currentPersonIndex)}%)`,
              opacity: index === currentPersonIndex ? 1 : 0,
              visibility: index === currentPersonIndex ? 'visible' : 'hidden',
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text"> {quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
  // END OF RETURN JSX
};

export default Carousel;
