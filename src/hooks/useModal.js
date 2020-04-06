import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { showModal, hideModal } from '../store/actions/app';

const useModal = () => {
  const isModalOpen = useSelector(state => state.app.isModalOpen, shallowEqual);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(showModal());
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    const onPressEsc = event => {
      if (event.keyCode === 27) {
        dispatch(hideModal());
      }
    };

    document.addEventListener('keydown', onPressEsc);

    return () => {
      document.removeEventListener('keydown', onPressEsc);
    };
  }, [dispatch]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
