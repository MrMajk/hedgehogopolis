import React, {useState, Fragment, useEffect} from "react"
import Input from "../uiComponents/input"
import PasswordInput from "../uiComponents/passwordInput"
import {Box, Button, Card, CardActionArea, CardActions, CardMedia, Checkbox, FormControl, FormControlLabel, IconButton, TextField} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

// @ts-ignore
import validator from 'validator'
import {useNavigate} from "react-router-dom";
// @ts-ignore
const CustomForm = (props) => {
    const {fieldsState, fieldsData, formValidState} = props
    const [fields, setFields] = useState(fieldsState)
    const [formValid, setFormValid] = useState(formValidState)
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imageBlob, setImageBlob] = useState('')
    useEffect(() => {
        setFields(fieldsState)
        console.log('FIELDSTATE-HOOK')
        if (fieldsState.image && Object.keys(fieldsState?.image).length > 0) {
            setImageBlob(`http://localhost:8082/uploads/${fieldsState.image}`)
        }
    }, [fieldsState]);


    const onChangeCheckbox = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({...fields, [name]: event.target.checked})
        setFormValid({...formValid, [name]: event.target.checked})
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        props.onFormHandler(fields)
        // if (!props.editMode) {
            // navigate(0)
            // console.log(':(')
            // setFields(fieldsState)
            // setIsFormValid(false)
        // }
    }

    const onChangeFile = (field: any) => (e: any) => {
        const {name} = e.target
        console.log(e.target.files[0])
        console.log(fields)
        setFields({...fields, [name]: e.target.files[0]})
        console.log(fields)
        setImageBlob(URL.createObjectURL(e.target.files[0]))
        setFormValid({...formValid, [name]: field?.required ? !validator.isEmpty(e.target.files[0]?.name) : true})
    }

    const onChangeInput = (field: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        if (name === 'email') {
            setFormValid({...formValid, [name]: validator.isEmail(value)})
        }
        if (name === 'password') {
            setFormValid({...formValid, [name]: validator.isStrongPassword(value)})
        } else {
            console.log(name, value)
            setFormValid({...formValid, [name]: field?.required ? !validator.isEmpty(value) : true})
        }
        setFields({...fields, [name]: value})
    }
    useEffect(() => {
        const formValidation = Object.values(formValid).every(x => x === true)
        setIsFormValid(formValidation)
    }, [formValid])

    useEffect(() => {
        setFormValid(formValidState)
    }, [formValidState])

    const printField = (field: any) => {
        if (field.type === 'text' || field.type === 'number') {
            return (
                <Input
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    errorMessage={field.errorMessage}
                    onChangeInput={onChangeInput(field)}
                    isValid={formValid[field.name]}
                    value={fields[field.name]}
                />
            )
        }
        if (field.type === 'password') {
            return (
                <PasswordInput
                    label={field.label}
                    name={field.name}
                    onChangeInput={onChangeInput(field)}
                    errorMessage={field.errorMessage}
                    isValid={formValid.password}
                    value={fields[field.name]}
                />
            )
        }

        if (field.type === 'checkbox') {
            return (
                <FormControlLabel control={
                    <Checkbox checked={fields[field.name]} onChange={onChangeCheckbox(field.name)}/>
                } label={field.label}/>
            )
        }
console.log('IMG: ', imageBlob, Object.keys(fields[field.name]))
        if (field.type === 'file') {
            return (
                 <Fragment>
                     {Object.keys(fields[field.name]).length === 0 &&
                      <TextField
                        label={field.label}
                        type="file"
                        name={field.name}
                        fullWidth
                        margin="normal"
                        onChange={onChangeFile(field)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                      />
                    }
                    {
                        imageBlob && Object.keys(fields[field.name]).length > 0 &&

                      <Card
                        raised
                        sx={{
                            maxWidth: 300
                        }}
                      >
                        <CardActionArea>
                          <IconButton onClick={() => {
                              setFields({...fields, [field.name]: {}})
                              setImageBlob('')
                              setFormValid({...formValid, [field.name]: false})
                          }}>
                            <CloseIcon/>
                          </IconButton>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            image={imageBlob}
                            title="Contemplative Reptile"
                          />
                        </CardActionArea>
                      </Card>
                    }
                </Fragment>
            )
        }
    }

    return (
        <Box component="form" onSubmit={ onFormSubmit } noValidate sx={{mt: 1}}>
            <FormControl>
                {
                    // @ts-ignore
                    fieldsData.map(field => {
                        return (
                            <Fragment key={field.name}>
                                {printField(field)}
                            </Fragment>
                        )
                    })
                }
                {props.children}
                <Button sx={{marginTop: 2}} disabled={!isFormValid} variant="contained" type="submit">
                    Submit
                </Button>
            </FormControl>
        </Box>
    )
}

export default CustomForm
