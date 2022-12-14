import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import React, {ChangeEvent, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../../services/Services'
import UserLogin from '../../models/UserLogin'
import './Login.css'
import { useDispatch } from 'react-redux'
import { addToken } from '../../store/tokens/tokensReducer'



function Login() {

    let navigate = useNavigate()

    const dispatch = useDispatch()

    const[token, setToken] = useState('')

    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }
        )
    
    function updatedModel(e: ChangeEvent<HTMLInputElement>){

        setUserLogin({
            ...userLogin, //spread operator ... -> "espalha" os atributos
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(token !== ''){
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])
    
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken )

            alert('Usuaário logado com sucesso!')
        } catch (error) {
            alert('Dados do usuario errados')
        }
    }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid alignItems='center' sm={6}>
            <Box paddingX={20}>
                <form onSubmit={onSubmit}>
                    <Typography variant='h3' 
                    gutterBottom 
                    color='textPrimary' 
                    component='h3'
                    align='center'
                    className='textos1'>
                        Entrar
                    </Typography>
                    <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='usuario'
                        label='usuário'
                        variant='outlined'
                        name='usuario'
                        type={'email'}
                        margin='normal'
                        fullWidth />
                    <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='senha'
                        label='senha'
                        variant='outlined'
                        name='senha'
                        type={'password'}
                        margin='normal'
                        fullWidth />
                    <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                    </Box>
                </form>
                <Box display='flex' justifyContent={'center'} marginTop={2}>
                    <Box marginRight={1}>
                        <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                    </Box>
                        <Link to="/cadastrousuario">
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                </Box>
            </Box>
        </Grid>

        <Grid sm={6} className='imagem'>

        </Grid>
    </Grid>

  )
}

export default login