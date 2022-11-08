import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import * as React from 'react';
import { connect } from 'react-redux';



interface PuntuarDispatchProps {
    rating : number;

}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
});

type PuntuarProps = IEstadoAplicacion & PuntuarDispatchProps;


const StyledRating = withStyles({
    iconFilled: {
        color: '#EF2E4A',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const labels: { [index: string]: string } = {
    0.5: '1',
    1: '2',
    1.5: '3',
    2: '4',
    2.5: '5',
    3: '6',
    3.5: '7',
    4: '8',
    4.5: '9',
    5: '10',
};

const _Rating = (props: PuntuarProps) => {

    const [value, setValue] = React.useState(props.rating);
    const [hover, setHover] = React.useState(-1);
   

    return (
        <div className="cajaRating" >

            <Box component="fieldset" mb={1} borderColor="transparent">

                <StyledRating
                    name="hover-feedback"
                    value={value}
                    defaultValue={2.5}
                    max={5}
                    precision={0.5}
                    onChange={(event, newValue: number) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    icon={<FavoriteIcon fontSize="inherit" />}
                />
            </Box>

            <div className="valorRating">
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            </div>
            
        </div>
    );
}

export const Puntuar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Rating);

export default Puntuar;