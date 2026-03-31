import React from 'react';
import Typography from '@mui/material/Typography';
import { isEmpty } from '../../lib/lib';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { green, red, grey} from '@mui/material/colors';

const LogsStyled = styled('div')({
	border: '1px solid black',
	borderRadius: '4px',
	background: grey[300],
	padding: '0 10px',
	marginTop: '10px'
})

const Logs = ({ logs, ...props }) => {
	return (
		<LogsStyled>
			{
				logs.map((log, index) => (
					<Box key={index} my={2}>
						{
							!isEmpty(log) && 
							isEmpty(log.response) ?
							Object.entries(log).map(([key, value]) => (
								<Typography color={log.success?green[500]:red[500]} key={key}>{`${key}: ${value}`}</Typography>
							))
							:
							Object.entries(log.response).map(([key, value]) => {
								if (key === 'status' || key === 'statusText') {
									return (
										<Typography color={red[500]} key={key}>
											{`${key}: ${value}`}
										</Typography>
									)
								}
								return null
							})
						}
					</Box>
				))
			}
		</LogsStyled>	
	)
}

export default (Logs)