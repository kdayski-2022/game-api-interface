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

const Resource = (props) => {

    const [logs, setLogs] = useState([])
    const [login] = useState('xxx')
    const [password] = useState('xxx')
    const [accessToken, setAccessToken] = useState('')

    const post = useCallback((payload, cb) => {
        console.log(accessToken)
        api.post(payload, { accessToken }).then(({ data }) => {
            setLogs((prev) => [...prev, data])
            if (cb) cb(data)
        }).catch((data) => setLogs((prev) => [...prev, data]))
    }, [accessToken])

    useEffect(() => {
        post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))
    }, [login, password, post])

    return (
        <Row>
            <Col xs={6}>
                <form onSubmit={(e) => post({ path: 'resource', data: parseForm(e, ['type']) })}>
                    <VerticalFlex>
                        <div className="d-flex justify-content-between">
                            <TextField name="type" label="Type" variant="outlined" margin="dense" />
                        </div>
                        <Button variant="post" type="submit">
                            Создать ресурс
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

export default (Resource)