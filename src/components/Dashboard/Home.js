import Navb from "./Essentials/Navbar";
import BrandLogo from "../../assets/images/logo12.png";
import { useSpring, animated } from 'react-spring';
import Footer from "./Essentials/footer";

function Home() {

  const textAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000, tension: 300, friction: 10 },
  });

  return (
    <>
      <Navb />
      <div className="home-container text-center">
        <div className="header-section mb-5 p-5">
          <h1 className="display-4">
        <animated.span style={textAnimation}>
              Welcome to{" "}
              <strong>
                {" "}
                <img
                  src={BrandLogo}
                  alt="Food Harvest App Logo"
                  className="logo-img"
                />{" "}
                Food Harvest App
              </strong> 
            </animated.span>
          </h1>

          <animated.p style={textAnimation} className="h5">
            Connect with local NGOs to donate extra food with just a tap.
          </animated.p>
          <animated.p style={textAnimation} className="h5">
            Partner with certified composters to responsibly handle inedible food waste.
          </animated.p>
          <animated.p style={textAnimation} className="h5">
            Join a network of community-focused farmers hotels and be part of the solution.
          </animated.p>
        </div>
        <div className="home-content">
          <div className="row justify-content-center gap-3">
            <div className="col-lg-3 col-md-6 mb-4 bg-light p-4 border" style={{ borderRadius: '20px' }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1661349604444-3c8416308121?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWwlMjBraXRjaGVufGVufDB8fDB8fHww"
                alt="hotel"
                className="img-fluid rounded image-height"
              />
              <h4 className="mt-4"><strong>Hotel</strong></h4>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 bg-light p-4 border" style={{ borderRadius: '20px' }}>
              <img
                src="https://images.unsplash.com/photo-1617878227827-8360231f7f03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JwaGFuYWdlfGVufDB8fDB8fHww"
                alt="ngo"
                className="img-fluid rounded image-height"
              />
              <h4 className="mt-4"><strong>NGO</strong></h4>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 bg-light p-4 border" style={{ borderRadius: '20px' }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1679260900300-88b80c98c089?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fE5HT3xlbnwwfHwwfHx8MA%3D%3D"
                alt="composter"
                className="img-fluid rounded image-height"
              />
              <h4 className="mt-4"><strong>Composter</strong></h4>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 bg-light p-4 border" style={{ borderRadius: '20px' }}>
              <img
                src="https://images.unsplash.com/photo-1615829254885-d4bfd5ce700e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxpbmRpYW4lMjBmYXJtZXJ8ZW58MHx8MHx8fDA%3D"
                alt="farmer"
                className="img-fluid rounded image-height"
              />
              <h4 className="mt-4"><strong>Farmer</strong></h4>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
