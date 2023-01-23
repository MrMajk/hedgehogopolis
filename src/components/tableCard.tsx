import {useRef} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../uiComponents/confirmDialog";
import {useRemoveTableMutation} from "../store/api/authApiSlice";
import {useNavigate} from "react-router-dom";
import {TableInterface} from "../types/table";

interface TableCardProps {
    loading?: boolean,
    table: TableInterface
}

const TableCard = (props: TableCardProps) => {
    type ConfirmDialogHandle = React.ElementRef<typeof ConfirmDialog>;

    const {loading = false, table} = props
    const dialogRef = useRef<ConfirmDialogHandle | null>(null)
    const [trigger] = useRemoveTableMutation()
    const navigate = useNavigate()

    return (
        <Card sx={{maxWidth: 345, m: 2}}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40}/>
                    ) : (
                        <Avatar
                            alt="user avatar"
                            src={`${process.env.REACT_APP_REST_API_URL}/${process.env.REACT_APP_REST_API_AVATAR_PATH}/${table.user.avatar}`}
                        />
                    )
                }
                title={
                    loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{marginBottom: 6}}
                        />
                    ) : (
                        <span>{table.user.nick}</span>
                    )
                }
                subheader={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="40%"/>
                    ) : (
                        <span>{table.createdAt}</span>
                    )
                }
            />
            {loading ? (
                <Skeleton sx={{height: 200}} animation="wave" variant="rectangular"/>
            ) : (
                <CardMedia
                    component="img"
                    height="200"
                    image={`${process.env.REACT_APP_REST_API_URL}/${process.env.REACT_APP_REST_API_IMAGE_PATH}/${table.image}`}
                    alt="table image"
                />
            )}
            <CardContent>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%"/>
                    </React.Fragment>
                ) : (
                    <Typography variant="h6">
                        name: {table.name} | seats: {table.seats}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{float:'right'}}>
                <IconButton onClick={() => navigate(`/table/${table.id}`)} aria-label="delete">
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="delete" onClick={() => dialogRef?.current?.handleClickOpen()}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
            <ConfirmDialog
                confirmMessage='Are you sure you want to delete this table?'
                handleConfirm={() => trigger(table.id)}
                ref={dialogRef}
            />
        </Card>
    )
}

export default TableCard
