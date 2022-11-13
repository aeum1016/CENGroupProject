import { createTheme } from '@mui/material/styles';

const DefaultTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#4bc0f1',
			light: '#b2e4f9',
			dark: '#0085cb',
		},
		secondary: {
			main: '#fa902a',
			dark: '#f87224',
			light: '#ffdf8a',
		},
		background: {
			paper: '#005496',
			default: '#00213d',
		},
		text: {
			hint: '#fa902a',
			secondary: '#b2e4f9',
			disabled: '#e1f4fd',
		},
	},
	typography: {
		fontFamily: 'Lato',
		h1: {
			fontSize: '3rem',
			fontWeight: 500,
		},
		h2: {
			fontSize: '2.7rem',
			fontWeight: 500,
		},
		h3: {
			fontSize: '2.5rem',
			fontWeight: 500,
		},
		h4: {
			fontSize: '2.2rem',
		},
		h5: {
			fontSize: '2rem',
		},
		h6: {
			fontSize: '1.7rem',
			fontWeight: 300,
		},
		button: {
			fontWeight: 600,
		},
		subtitle1: {
			fontWeight: 400,
			fontSize: '1.5rem',
		},
		subtitle2: {
			fontWeight: 400,
			fontSize: '1.2rem',
		},
		body1: {
			fontSize: '1.2rem',
			fontWeight: 300,
		},
		body2: {
			fontSize: '1rem',
			fontWeight: 300,
		},
	},
});

export default DefaultTheme;
