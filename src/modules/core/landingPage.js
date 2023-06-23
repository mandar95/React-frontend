import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Fade } from "react-reveal";
import styled from "styled-components";
import { Button } from 'react-bootstrap';

const LandginPage = () => {
  const { userName } = useSelector((state) => state.login)
  const navigate = useNavigate();
  return (
    <div>
      <Fade down delay={1000} duration={1000}>
        <div style={{ margin: '20px' }}>
          <h1>Landing Page (Welcome {userName})</h1>
          {/* <button><Link to="/login">Login</Link></button> */}
          <Button style={{
            borderRadius: '20px',
            marginTop: '20px',
            width: '150px'
          }} onClick={() => navigate("/sign-in")} variant="primary">Login</Button>
        </div>
      </Fade>
      <Fade left delay={700}>
        <Div
          bgposition={"top right"}
          bgsize={"850px"}
          bgimage={"/assets/images/landing-page/bg-1.png"}
        >
        </Div>
      </Fade>
    </div >
  );
}

export default LandginPage;

const Div = styled.div`
	background-repeat: no-repeat;
	background-position: ${({ bgposition }) => bgposition};
	background-size: ${({ bgsize }) => bgsize};
	background-image: ${({ bgimage }) => `url(${bgimage})`};
	padding: ${({ padding }) => padding || "50px"};
	${({ padding }) => (padding ? `@media (max-width: 500px) {padding: 0}` : "")};
  height:100vh
`;