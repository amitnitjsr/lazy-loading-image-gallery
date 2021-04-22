import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './next-prev.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        alignItems: 'center'
    },
}));

const NextPrev = (props) => {
    const classes = useStyles();

    const handleClose = () => {
        props.close();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>

                    <div className={classes.paper} >
                        <div >
                            <i className={`zmdi zmdi-arrow-left zmdi-hc-2x ${props.prevDisable ? 'arrow-disable' : 'arrow'}`}
                                onClick={() => props.prevHandler()}
                            />
                        </div>
                        <img src={props.imageData} alt="no_image" className="sub-image" />
                        <div>
                            <i className={`zmdi zmdi-arrow-right zmdi-hc-2x ${props.nextDisable ? 'arrow-disable' : 'arrow'}`}
                                onClick={() => props.nextHandler()}
                            />
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default NextPrev;