import React, { Component } from 'react';
import flowersPink from './img/Watercolor-pink-flowers.png';
import branchesWhite from './img/Watercolor-branches-white.png';
import autumnClassicFlowers from './img/background-autumn classic-v3.png';
import backgroundMusic from './audio/bensound-tenderness.mp3';
import './App.css';


function music() {
  // console.log('PLAY MUSIC!!');
  const sound = new Audio(backgroundMusic);
  sound.play();
  sound.currentTime = 0;
  sound.volume = 0.2;
}

const copy = {
  en: {
    name: 'Rosemary',
    welcome: 'We kindly invite you to...',
    body1: 'Celebrate with us',
    body2: '65th birthday!',
    bodyFull: 'Celebrate with us Rosemary\'s 65th birthday!',
    date: 'Saturday, March 4th, 2023 @ 7pm',
    address: '15101 Smith Rd',
    address2: 'Charlotte, NC 28273',
    description: 'An exciting time with family and friends',
    invitation: 'Giving God Thanks for Six Decades of Life',
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
    }, 700);
  }


  render() {
    return (
      <div className="App">
        <audio autoPlay>
          <source src={backgroundMusic} />
        </audio>

        <div className="container-fluid">
          <header className="header-row row" />
          <section className="img-row row">
            <img
              src={branchesWhite}
              id="branchesWhite"
              className="flowers fadeInOpaque "
              alt="logo"
            />
            <img
              src={autumnClassicFlowers}
              id="flowerBottom"
              className="flowers fadeInOpaque "
              alt="logo"
            />
          </section>

          <section className="body-row row align-items-center fadeIn">
            <div className="col-0 col-md-1 col-xl-3" />
            <div className={`${(!this.state.loading) ? 'invitationBorder ' : ''}col col-md-10 col-xl-6 text-center`}>
              <div className="row">
                <div className="welcomeText col text-left fadeIn">{text.welcome}</div>
              </div>
              <div className="row">
                <div className="bodyText bodyFull col mobile fadeIn">{text.bodyFull}</div>
              </div>
              <div className="row">
                <div className="bodyText bodyTop col desktop fadeIn">{text.body1}</div>
                <div className="col-sm-3 desktop" />
              </div>
              <div className="row">
                <div className="bodyText bodyMid col desktop fadeIn">{`${text.name}'s`}</div>
                <div className="col-sm-1 desktop" />
              </div>
              <div className="row">
                <div className="col-sm-4 desktop " />
                <div className="bodyText bodyBottom col desktop fadeIn">{text.body2}</div>
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
