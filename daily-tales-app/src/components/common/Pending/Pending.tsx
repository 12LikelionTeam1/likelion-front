import Backdrop from '../Backdrop/Backdrop';
import Logo from '../Logo/Logo';

const Pending = () => {
  return (
    <div id='pending'>
      <Backdrop hide={() => {}}>
        <div className='w-full h-full flex justify-center items-center'>
          <Logo />
        </div>
      </Backdrop>
    </div>
  );
};

export default Pending;
