import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Row, Col } from 'react-bootstrap'
import api from '../api/api'
import { styled } from '@mui/material/styles'
import Logs from '../components/UI/Logs'
import { parseForm } from '../lib/lib';

const VerticalFlex = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	marginBottom: '20px',
})

const Main = (props) => {

	const [logs, setLogs] = useState([])
	const [login, setLogin] = useState('xxx')
	const [password, setPassword] = useState('xxx')
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
					<Button variant="get" onClick={() => get({ path: "user_info" })}>
						Информация об игроке
					</Button>
				</VerticalFlex>

				<VerticalFlex>
					<TextField value={login} label="Имя" variant="outlined" margin="dense" onChange={(e) => setLogin(e.currentTarget.value)} />
					<TextField value={password} label="Пароль" variant="outlined" margin="dense" onChange={(e) => setPassword(e.currentTarget.value)} />
					<Button variant="get" onClick={() => post({ path: 'register', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))}>
						Регистрация
					</Button>
					<Button variant="post" onClick={() => post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))}>
						Авторизация
					</Button>
				</VerticalFlex>

				<form onSubmit={(e) => get({ path: "players", data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" />
							<TextField name="y" label="Y" variant="outlined" />
						</div>
						<Button variant="get" type="submit">
							Получить список игроков рядом
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => post({ path: 'move', data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" />
							<TextField name="y" label="Y" variant="outlined" />
						</div>
						<Button variant="post" type="submit">
							Перемещение
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => post({ path: 'deposit', data: parseForm(e, ['amount']) })}>
					<VerticalFlex>
						<TextField name="amount" label="Количество" variant="outlined" />
						<Button variant="post" type="submit">
							Пополнить кошелек
						</Button>
					</VerticalFlex>
				</form>

				<VerticalFlex>
					<Button variant="get" onClick={() => get({ path: 'nfts' })}>
						Получить все NFT
					</Button>
				</VerticalFlex>

				<form onSubmit={(e) => post({ path: "resource", data: parseForm(e, ["resource"]) })}>
					<VerticalFlex>
						<Select
							name="resource"
							value="stone"
							label="Тип"
						>
							<MenuItem value={'stone'}>Stone</MenuItem>
							<MenuItem value={'wood'}>Wood</MenuItem>
							<MenuItem value={'water'}>Water</MenuItem>
						</Select>
						<Button type="submit" variant="post">
							Новый ресурс
						</Button>
					</VerticalFlex>
				</form>

				<VerticalFlex>
					<Button variant="get" onClick={() => get({ path: "resources" })}>
						Список ресурсов
					</Button>
				</VerticalFlex>

				<form onSubmit={(e) => post({ path: 'object', data: parseForm(e, ['x', 'y', 'object']) })}>
					<VerticalFlex>
						<Select
							value="car"
							name="object"
							label="Тип"
						>
							<MenuItem value={'car'}>Car</MenuItem>
							<MenuItem value={'plane'}>Plane</MenuItem>
						</Select>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" />
							<TextField name="x" label="Y" variant="outlined" />
						</div>
						<Button variant="post" type="submit">
							Новый объект
						</Button>
					</VerticalFlex>
				</form>

				<VerticalFlex>
					<Button variant="get" onClick={() => get({ path: 'objects' })}>
						Список Объектов
					</Button>
				</VerticalFlex>

				<VerticalFlex>
					<Button variant="del" onClick={() => post({ path: 'reset', data: { type: 'Player' } })}>
						Сброс пользователей
					</Button>
				</VerticalFlex>

				<VerticalFlex>
					<Button variant="del" onClick={() => post({ path: 'reset_all' })}>
						Сбросить ядерную боеголовку на Киев
					</Button>
				</VerticalFlex>

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

export default (Main)