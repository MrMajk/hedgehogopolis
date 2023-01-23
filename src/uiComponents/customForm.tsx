import React, {useState, Fragment, useEffect} from "react"
import Input from "../uiComponents/input"
import PasswordInput from "../uiComponents/passwordInput"
import {Box, Button, Card, CardActionArea, CardMedia, Checkbox, FormControl, FormControlLabel, IconButton, TextField} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
// @ts-ignore
import validator from 'validator'
import {CustomFormInterface} from "../types/customForm";

interface CustomFormProps {
    onFormHandler: (fields: CustomFormInterface) => void,
    fieldsState: CustomFormInterface,
    fieldsData: CustomFormInterface,
    formValidState: CustomFormInterface,
    editMode?: boolean,
    children?: JSX.Element
}

const CustomForm = (props: CustomFormProps) => {
    const {fieldsState, fieldsData, formValidState, children, onFormHandler} = props
    const [fields, setFields] = useState<CustomFormInterface>(fieldsState)
    const [formValid, setFormValid] = useState(formValidState)
    const [isFormValid, setIsFormValid] = useState(false)
    const [imageBlob, setImageBlob] = useState<string>('')
    useEffect(() => {
        setFields(fieldsState)
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
        onFormHandler(fields)
    }

    const onChangeFile = (field: CustomFormInterface) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target
        const fileData: File = (e.target.files as FileList)[0]
        if (!validator.isEmpty(fileData?.name)) {
            setFields({...fields, [name]: fileData})
            setImageBlob(URL.createObjectURL(fileData))
            setFormValid({...formValid, [name]: field?.required ? !validator.isEmpty(fileData?.name) : true})
        }
    }

    const onChangeInput = (field: CustomFormInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const printField = (field: CustomFormInterface) => {
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
        if (field.type === 'file') {
            console.log(fields[field.name].name?.length)
            return (
                <Fragment>
                    {!fields[field.name].name?.length &&
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
                        imageBlob && fields[field.name].name?.length > 0 &&

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
        <Box component="form" onSubmit={onFormSubmit} noValidate sx={{mt: 1}}>
            <FormControl>
                {
                    fieldsData.map((field:CustomFormInterface) => {
                        return (
                            <Fragment key={field.name}>
                                {printField(field)}
                            </Fragment>
                        )
                    })
                }
                {children}
                <Button sx={{marginTop: 2}} disabled={!isFormValid} variant="contained" type="submit">
                    Submit
                </Button>
            </FormControl>
        </Box>
    )
}

export default CustomForm
