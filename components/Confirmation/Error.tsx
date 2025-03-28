import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { ConfirmationContainer, primaryTitle, description } from './styles';
import { ErrorIcon } from '@/assets/svg';

type Props = {
  open: boolean;
};

export const Error = ({ open }: Props) => {
  const handleClose = () => {};

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        return handleClose();
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
      sx={{
        backgroundColor: 'rgba(0, 66, 95, 0.5)'
      }}
    >
      <Fade in={open}>
        <Box sx={ConfirmationContainer}>
          <ErrorIcon />
          <Typography sx={primaryTitle}>Confirmation Successful</Typography>
          <Typography sx={description}>
            You will access the dashboard shortly.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};
