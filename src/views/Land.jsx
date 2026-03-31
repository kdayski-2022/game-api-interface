import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Row, Col } from 'react-bootstrap'
import api from '../api/api'
import styled from 'styled-components'
import Logs from '../components/UI/Logs'
import { parseForm } from '../lib/lib';

const VerticalFlex = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`

const Land = (props) => {

	const [logs, setLogs] = useState([])
	const [login] = useState('xxx')
	const [password] = useState('xxx')
	const [accessToken, setAccessToken] = useState('')

	const post = useCallback((payload, cb) => {
		api.post(payload, { accessToken }).then(({ data }) => {
			setLogs((prev) => [...prev, data])
			if (cb) cb(data)
		}).catch((data) => setLogs((prev) => [...prev, data]))
	}, [accessToken])

	const get = useCallback((payload) => {
		api.get(payload, { accessToken })
			.then(({ data }) => setLogs((prev) => [...prev, data]))
			.catch((data) => setLogs((prev) => [...prev, data]))
	}, [accessToken])

	useEffect(() => {
		post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))
	}, [login, password, post])

	return (
		<Row>
			<Col xs={6}>
                <VerticalFlex>
					<Button variant="get" onClick={() => get({ path: 'land/many' })}>
						Получить участки
					</Button>
				</VerticalFlex>

                <form onSubmit={(e) => post({ path: 'land/many/buy', data: parseForm(e, ['x1', 'y1', 'x2', 'y2']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x1" label="X1" variant="outlined" margin="dense"/>
							<TextField name="x2" label="X2" variant="outlined" margin="dense"/>
							<TextField name="y1" label="Y1" variant="outlined" margin="dense"/>
                            <TextField name="y2" label="Y2" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Покупка участков
						</Button>
					</VerticalFlex>
				</form>

                <form onSubmit={(e) => post({ path: 'land/many/sell', data: parseForm(e, ['x1', 'y1', 'x2', 'y2']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x1" label="X1" variant="outlined" margin="dense"/>
							<TextField name="x2" label="X2" variant="outlined" margin="dense"/>
							<TextField name="y1" label="Y1" variant="outlined" margin="dense"/>
                            <TextField name="y2" label="Y2" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Продажа участков
						</Button>
					</VerticalFlex>
				</form>

                <form onSubmit={(e) => get({ path: 'land/one', data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" margin="dense"/>
							<TextField name="y" label="Y" variant="outlined" margin="dense"/>
						</div>
						<Button variant="get" type="submit">
							Получить участок
						</Button>
					</VerticalFlex>
				</form>

                <form onSubmit={(e) => post({ path: 'land/one/buy', data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" margin="dense"/>
							<TextField name="y" label="Y" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Покупка участков
						</Button>
					</VerticalFlex>
				</form>

                <form onSubmit={(e) => post({ path: 'land/one/sell', data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" margin="dense"/>
							<TextField name="y" label="Y" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Продажа участков
						</Button>
					</VerticalFlex>
				</form>

				
			</Col>
			<Col xs={6}>
				<Logs logs={logs}/>
				<VerticalFlex>
					<Button variant="del" onClick={() => setLogs([])}>
						Очистить логи
					</Button>
				</VerticalFlex>
			</Col>
		</Row>
	)
}

export default (Land)