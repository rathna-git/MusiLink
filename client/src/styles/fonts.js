import { css } from 'styled-components/macro';

const fonts = css`
  @font-face {
    font-family: 'Open Sans';
    src: url('../../public/fonts/OpenSans-Regular.ttf') format('ttf'),
    url('../../public/fonts/OpenSans-Light.ttf') format('ttf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('../../public/fonts/OpenSans-Bold.ttf') format('ttf'),
    url('../../public/fonts/OpenSans-SemiBold.ttf') format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('../../public/fonts/OpenSans-ExtraBold.ttf') format('ttf');
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;