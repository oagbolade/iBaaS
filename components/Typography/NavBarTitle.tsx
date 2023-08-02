import Typography from '@mui/material/Typography';
import {navBarTitle} from "./styles"

type Props ={
    title: string;
}

export const NavBarTitle = ({title}: Props) =>(
    <Typography sx={navBarTitle}>{title}</Typography>
)