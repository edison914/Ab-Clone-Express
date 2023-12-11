import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewModal.css'
import { DeleteReviewThunk } from '../../store/review';

function DeleteReviewModal ({reviewId}) {
    //console.log(`reviewId`,reviewId)
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(DeleteReviewThunk(reviewId))
          .then(closeModal)
          .catch(async (res) => {
            if (res && res.message) {
                setErrors(res);
            }
        });
    };
    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
        <div className='deletereview-confirm-container'>
            <h1>Confirm Delete</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>
                Are you sure you want to remove this review?
            </p>

            <button
                className='deletereview-confirm-button'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Review)
            </button>

            <button
                className='deletereview-cancel-button'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Review)
            </button>

        </div>
    )
}

export default DeleteReviewModal
