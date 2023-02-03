import React, { Component } from 'react';

import confetti from 'canvas-confetti';

import flowersPink from './img/Watercolor-pink-flowers.png';
import branchesWhite from './img/Watercolor-branches-white.png';
import autumnClassicFlowers from './img/collection-transparent-lines-gold-glitter-0.png';
// import autumnClassicFlowers from './img/background-autumn classic-v3.png';

import backgroundMusic from './audio/Kool-and-The-Gang-Celebration.mp3';
import './App.css';


function music() {
  // console.log('PLAY MUSIC!!');
  const sound = new Audio(backgroundMusic);
  sound.play();
  sound.currentTime = 0;
  sound.volume = 0.2;
}

function launchConfetti() {
  // do this for 30 seconds
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    // launch a few confetti from the left edge
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    // and launch a few from the right edge
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    // keep going until we are out of time
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

function birthdayBalloons() {
  // https://erdoganbavas.medium.com/creating-birthday-balloons-like-twitter-profile-no-image-5348a1dc2720
  const density = 12; // concurrent balloon count
  const balloons = [];
  const colors = ['rose', 'silver', 'yellow', 'green', 'blue', 'red'];

  const stringElement = document.createElement('div');
  stringElement.classList.add('string');


  function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function randomColor() {
    return colors[random(0, colors.length)];
  }
  function releaseBalloon(balloon) {
    const delay = random(100, 1000);
    const x = random(-99, -30); // random x value to fly
    const y = random(-99, -30); // random y value to fly

    const sequence = [{
      offset: 0,
      transform: 'rotateZ(45deg) translate(0, 0)',
    }];


    // random fly direction
    if (random(0, 2) === 0) {
      // first fly up to top left

      // left distance to keep balloon in view
      balloon.style.left = `${-1 * x}vw`;

      sequence.push({
        offset: x / -200,
        transform: `rotateZ(45deg) translate(${x}vw, 0)`,
      });
      sequence.push({
        offset: (x + y) / -200,
        transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`,
      });
      sequence.push({
        offset: (-100 + y) / -200,
        transform: `rotateZ(45deg) translate(-100vw, ${y}vh)`,
      });
    } else {
      // fist fly up to right top

      sequence.push({
        offset: y / -200,
        transform: `rotateZ(45deg) translate(0, ${y}vh)`,
      });
      sequence.push({
        offset: (x + y) / -200,
        transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`,
      });
      sequence.push({
        offset: (-100 + x) / -200,
        transform: `rotateZ(45deg) translate(${x}vw, -100vh)`,
      });
    }

    // last move is common
    sequence.push({
      offset: 1,
      transform: 'rotateZ(45deg) translate(-100vw, -100vh)',
    });

    const balloonAnimation = balloon.animate(sequence, {
      duration: 15000,
      delay,
    });


    balloonAnimation.onfinish = () => { releaseBalloon(balloon); };
  }


  for (let i = 0; i < density; i++) {
    const element = document.createElement('div');
    element.classList.add('balloon');
    element.classList.add(randomColor());

    element.append(stringElement.cloneNode());
    const ballonContainer = document.querySelector('.header-row');
    ballonContainer.append(element);

    setTimeout(() => {
      releaseBalloon(element);
    }, (i * 2000) + random(500, 1000));
  }
}


const copy = {
  en: {
    name: 'Rosemary',
    welcome: 'Let\'s celebrate',
    body1: '65',
    body2: '65th Birthday!',
    bodyFull: 'Cheers to 65 Years!',
    date: 'Saturday, March 4th, 2023 @ 7pm',
    address: '15101 Smith Rd',
    address2: 'Charlotte, NC 28273',
    description: 'An exciting time with family and friends',
    invitation: 'We can\'t wait to see you there',
    dressCode: 'Informal Cocktail Attire',
    rsvp: 'R.S.V.P.',
    inviteMsg: 'Dios ha sido muy bondadoso conmigo y me ha dado más de lo que hubiera imaginado.',
    inviteMsg2: 'A estas alturas de mi vida, solo quiero salud y seguir viajando!',
    inviteMsg3: 'Es así que, en este día tan especial, mi mejor regalo será tu presencia y compañia.',
  },
};
const text = copy.en;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      touchMusic: true,
    };
  }

  componentWillMount() {
    document.addEventListener('click', () => {
      console.log('CLICK');
      if (this.state.touchMusic) {
        music();
        this.setState({
          touchMusic: false,
        });
      }
    });
  }

  componentDidMount() {
    // delay class for border animation
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      launchConfetti();
      birthdayBalloons();
    }, 700);
  }


  render() {
    return (
      <div className="App">
        {/* <audio autoPlay>
          <source src={backgroundMusic} />
        </audio> */}

        <div className="container-fluid">
          <header className="header-row row" />
          <section className="img-row row">
            <img
              src={autumnClassicFlowers}
              id="flowerTop"
              className="flowers mobile-opacity fadeInOpaque "
              alt="logo"
            />
            <img
              src={autumnClassicFlowers}
              id="flowerBottom"
              className="flowers mobile-opacity fadeInOpaque "
              alt="logo"
            />
          </section>

          <section className="body-row row align-items-center fadeIn">
            <div className="col-0 col-md-1 col-xl-3" />
            <div className={`${(!this.state.loading) ? ' ' : ''}col col-md-10 col-xl-6 text-center`}>
              <div className="row">
                <div className="welcomeText col text-center fadeIn">{text.welcome}</div>
              </div>
              <div className="row">
                {/* <div className="bodyText bodyFull col mobile fadeIn">{text.bodyFull}</div> */}
              </div>
              <div className="row">
                <div className="bodyText body1 bodyTop col fadeIn">{text.body1}</div>
                {/* <div className="col desktop" /> */}
              </div>
              <div className="row">
                <div className="bodyText bodyMid col fadeIn">{`${text.name}'s`}</div>
                {/* <div className="col desktop" /> */}
              </div>
              <div className="row">
                {/* <div className="col desktop" /> */}
                <div className="bodyText bodyBottom col fadeIn">{text.body2}</div>
              </div>
              <div className="row">
                <div className="dateText col-12 fadeIn">{text.date}</div>
                <div className="addressText col-12 fadeIn">{text.address}</div>
                <div className="addressText col-12 fadeIn">{text.address2}</div>
              </div>
              <div className="row invitationText-row">
                <div className="invitationText col fadeIn">
                  {text.invitation}
                </div>
              </div>
              <div className="row" />
              <div className="row">
                <div className="dressCodeText col fadeIn">{text.dressCode}</div>
              </div>
              <div className="row">
                <div className="col-2" />
                <div className="col line-break fadeIn" />
                <div className="col-2" />
              </div>
              <div className="row">
                <div className="col bGift fadeIn">A birthday gift:</div>
              </div>
              <div className="row">
                <div className="inviteMsg col fadeIn">
                  "{text.inviteMsg}
                </div>
              </div>
              <div className="row">
                <div className="inviteMsg col fadeIn">
                  {text.inviteMsg2}
                </div>
              </div>
              <div className="row">
                <div className="inviteMsg col fadeIn">
                  {text.inviteMsg3}"
                </div>
              </div>
              <div className="row">
                <div className="col-3" />
                <div className="col text-right citeText fadeIn">
                  <cite>- Ross</cite>
                </div>
                <div className="col-3" />
              </div>

            </div>
            <div className="col-0 col-md-1 col-xl-3" />
          </section>

          <div className="rsvp-row row">
            <div className="col text-center ">
              <a href="https://mauriciocampuzano.typeform.com/to/EzQgUc3V">
                <button className="btn btn-warning btn-lg fadeIn">
                  {text.rsvp}
                  <div><span className="btn-span">here by Feb 15!</span></div>
                </button>
              </a>
            </div>
          </div>
          <footer className="footer-row row" />
        </div>


      </div>
    );
  }
}


export default App;
