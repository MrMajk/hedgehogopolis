import React, {useEffect, useState} from "react";
import {useAddTableMutation, useLazyGetTablesQuery, useLazyGetTableByIdQuery, useEditTableMutation} from "../store/api/authApiSlice";
import CustomForm from "../uiComponents/customForm";
import useNotification from "../hooks/useNotification";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {CustomFormInterface} from "../types/customForm";

const AddTable = (props: {editMode?: boolean}) => {
    const [fieldState, setFieldState] = useState<CustomFormInterface>({name: '', seats: 0, image: {}});
    const [formValidState, setFormValidState] = useState({name: false, seats: false, image: false});
    const [addTable] = useAddTableMutation()
    const [editTable] = useEditTableMutation()
    const {showNotification} = useNotification()
    let {id} = useParams()
    const navigate = useNavigate()

    const tableData = useLoaderData() as CustomFormInterface
    const onFormHandler = (fields: CustomFormInterface) => {
        let fd = new FormData()

        for (let key in fields) {
            fd.append(key, fields[key]);
        }
        if (props.editMode) {
            editTable({id, fd}).then((response:any) => {
                if (response?.error) {
                    showNotification('Error!', 'error', 'Error')
                } else {
                    showNotification('Success edit!', 'success', 'Success!')
                }
            })
        } else {
            addTable(fd).then((response: any) => {
                if (response?.error) {
                    showNotification('Error!', 'error', 'Error')
                } else {
                    navigate(0)
                    showNotification('Success!', 'success', 'Success!')
                }
            })
        }

    }

    useEffect(() => {
        if (props.editMode && id) {
            if (tableData) {
                setFieldState({name: tableData.name, seats: tableData.seats, image: tableData.image})
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
