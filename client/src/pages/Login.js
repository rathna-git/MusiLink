import styled from 'styled-components/macro';

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  margin: 20px 0 70px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const LOGIN_URI = process.env.NODE_ENV !== 'production' 
                    ? 'http://localhost:8888/login'
                    : ' https://musilink-a8e61c582d6a.herokuapp.com/login';
                    
const Login = () => (
  <StyledLoginContainer>
    <h1>MUSILINK</h1>
    <StyledLoginButton href={LOGIN_URI}>
      LOG IN TO SPOTIFY
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;