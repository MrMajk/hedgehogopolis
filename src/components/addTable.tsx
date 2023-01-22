import React, {useEffect, useState} from "react";
import {useAddTableMutation, useLazyGetTablesQuery, useLazyGetTableByIdQuery, useEditTableMutation} from "../store/api/authApiSlice";
import CustomForm from "../uiComponents/customForm";
import useNotification from "../hooks/useNotification";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";

const AddTable = (props: any) => {
    const [fieldState, setFieldState] = useState({name: '', seats: 0, image: {}});
    const [formValidState, setFormValidState] = useState({name: false, seats: false, image: false});
    const [table, setTable] = useState(null);
    const [addTable] = useAddTableMutation()
    // @ts-ignore
    const [getTables] = useLazyGetTablesQuery()
    const [getTable] = useLazyGetTableByIdQuery()
    const [editTable] = useEditTableMutation()
    const {showNotification} = useNotification()
    let {id} = useParams()
    const navigate = useNavigate()

    const response = useLoaderData()
    const onFormHandler = (fields: any) => {
        let fd = new FormData()

        for (let key in fields) {
            fd.append(key, fields[key]);
        }
        if (props.editMode) {
            editTable({id, fd}).then((response: any) => {
                if (response?.error) {
                    showNotification('Error!', 'error', 'Error')
                } else {
                    // @ts-ignore
                    // getTables()
                    showNotification('Success edit!', 'success', 'Success!')
                }
            })
        } else {
            addTable(fd).then((response: any) => {
                if (response?.error) {
                    showNotification('Error!', 'error', 'Error')
                } else {
                    // @ts-ignore
                    // getTables()
                    navigate(0)
                    showNotification('Success!', 'success', 'Success!')
                }
            })
        }

    }
    const LoadTable = () => {
            const response = useLoaderData()
        console.log('RESP', response)
            // @ts-ignore
            setTable(response.data)
    }

    // @ts-ignore
    useEffect(() => {
        console.log('TEST')
        if (props.editMode && id) {
            // @ts-ignore
            if (response) {
                // @ts-ignore
                setFieldState({name: response.name, seats: response.seats, image: response.image})
                setFormValidState({name: true, seats: true, image: true})

            }
        } else {
            setFieldState({name: '', seats: 0, image: {}})
            setFormValidState({name: false, seats: false, image: false})
        }
    }, [id]);


    return (
        <CustomForm
            onFormHandler={onFormHandler}
            fieldsState={fieldState}
            editMode={props.editMode}
            formValidState={formValidState}
            fieldsData={[
                {
                    label: 'name',
                    type: 'text',
                    name: 'name',
                    errorMessage: 'Name is required',
                    required: true
                },
                {
                    label: 'Seats',
                    type: 'number',
                    name: 'seats',
                    errorMessage: 'Seats are required',
                    required: true
                },
                {
                    label: '',
                    type: 'file',
                    name: 'image',
                    errorMessage: 'Image is required',
                    required: true
                }
            ]}
        />
    )
}

export default AddTable
