import { createTheme } from '@mui/material/styles';
import { green, orange, purple, red } from '@mui/material/colors';

const theme = createTheme({
	components: {	
		// Название компонента
		MuiInput: {
			variants: [
				{
					props: { variant: 'get' },
					style: {
						marginTop: '5px',
					},
				},
				{
					props: { variant: 'post' },
					style: {
						marginTop: '5px',
					},
				},
				{
					props: { variant: 'del' },
					style: {
						marginTop: '5px',
					},
				},
			]
		},
		MuiButton: {
			// Перезапись дефолтных стилей компонента
			styleOverrides: {
				root: {
					padding: '10px',
					color: 'white',

				}
			},
			// Условная стилистика в зависимости от props variant (<Button variant="get" />)
			variants: [
				{
					props: { variant: 'get' },
					style: {
						backgroundColor: green[500],
						marginTop: '10px',
						'&:hover': {
							background: green[700],
						},
					},
				},
				{
					props: { variant: 'post' },
					style: {
						backgroundColor: orange[500],
						marginTop: '10px',
						'&:hover': {
							background: orange[700],
						},
					},
				},
				{
					props: { variant: 'del' },
					style: {
						backgroundColor: red[500],
						marginTop: '10px',
						'&:hover': {
							background: red[700],
						},
					},
				},
			]
		},
		MuiTypography: {
			variants: [
				{
					props: { variant: 'nav-link' },
					style: {
						backgroundColor: 'white',
						marginTop: '10px',
					},
				},
			]
		}
	},
	// Главные стили на всю страницу
	palette: {
		primary: {
			main: green[500],
		},
		secondary: {
			main: purple[500],
		},
	},
})

export default theme