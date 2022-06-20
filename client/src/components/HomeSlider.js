import React, { useState, useEffect } from 'react';
import './homeSlider.css';

const items = [
  {
    copy: 'PIZZA',
    image: 'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
  },
  {
    copy: 'BURGER',
    image:
      'https://img.freepik.com/photos-gratuite/burger-americain-juteux-hamburger-cheeseburger-deux-galettes-boeuf-sauce-se-prelassant-espace-noir_124865-5964.jpg?w=2000',
  },
  {
    copy: '04. Ut enim ad minim veniam, quis nostrud exercitation.',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Pasta-alla-vodka-f1d2e1c.jpg',
  },
  {
    copy: '05. Llamco nisi ut aliquip ex ea commodo consequat.',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/08/ac/e6/c4/neapolitan-express.jpg',
  },
  {
    copy: '06. Misi ut aliquip ex ea commodo consequat.',
    image:
      'https://images-gmi-pmc.edge-generalmills.com/e59f255c-7498-4b84-9c9d-e578bf5d88fc.jpg',
  },
];

const Card = (props) => {
  return (
    <>
      <li
        className='card'
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover',
          height: '300px',
          position: 'relative',
        }}
      >
        <h4
          style={{
            color: 'black',
            backgroundColor: '#ffffff50',
            position: 'absolute',
            bottom: '0',
            left: 0,
            padding: 0,
            margin: 0,
            width: '100%',
            height: '50px',
          }}
        >
          {props.copy}
        </h4>
      </li>
    </>
  );
};

const HomeSlider = () => {
  const [moveClass, setMoveClass] = useState('');
  const [carouselItems, setCarouselItems] = useState(items);

  useEffect(() => {
    document.documentElement.style.setProperty('--num', carouselItems.length);
  }, [carouselItems]);

  const handleAnimationEnd = () => {
    if (moveClass === 'prev') {
      shiftNext([...carouselItems]);
    } else if (moveClass === 'next') {
      shiftPrev([...carouselItems]);
    }
    setMoveClass('');
  };

  const shiftPrev = (copy) => {
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    setCarouselItems(copy);
  };

  const shiftNext = (copy) => {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    setCarouselItems(copy);
  };

  return (
    <div className='carouselwrapper module-wrapper'>
      <div className='ui'>
        <button onClick={() => setMoveClass('next')} className='prev'>
          <span className='material-icons'>chevron_left</span>
        </button>
        <button onClick={() => setMoveClass('prev')} className='next'>
          <span className='material-icons'>chevron_right</span>
        </button>
      </div>
      <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
        {carouselItems.map((t, index) => (
          <Card key={t.copy + index} image={t.image} icon={t.icon} copy={t.copy} />
        ))}
      </ul>
    </div>
  );
};

export default HomeSlider;
