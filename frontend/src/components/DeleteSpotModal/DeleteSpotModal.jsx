import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { DeleteSpotThunk } from '../../store/spot';

function DeleteSpot ({spotId}) {
    console.log(spotId)
    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    //console.log(spotId)
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(DeleteSpotThunk(spotId))
          .then(closeModal)
          .catch(async (res) => {
            //const data = await res.json();
            //console.log(data)
            if (res && res.message) {
                setErrors(res);
            }
            //console.log(errors)
        });
    };
    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='deletespot-confirm-container'>
            <h1>Confirm Delete</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>
                Are you sure you want to remove this spot?
            </p>

            <button
                className='deletespot-confirm-button'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Spot)
            </button>

            <button
                className='deletespot-cancel-button'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Spot)
            </button>

        </div>
    )
}

export default DeleteSpot
