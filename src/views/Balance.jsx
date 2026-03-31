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

const Balance = (props) => {

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
					<Button variant="get" onClick={() => get({ path: 'balance' })}>
						Получить баланс
					</Button>
				</VerticalFlex>

                <form onSubmit={(e) => post({ path: 'balance/deposit', data: parseForm(e, ['amount']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="amount" label="Количество" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Пополнить баланс
						</Button>
					</VerticalFlex>
				</form>

                <form onSubmit={(e) => post({ path: 'balance/withdraw', data: parseForm(e, ['amount']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="amount" label="Количество" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Снять баланс
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

export default (Balance)