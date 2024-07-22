import Backdrop from '../Backdrop/Backdrop';
import Logo from '../Logo/Logo';

type Props = {
  pendingVisible: boolean;
};

const Pending = ({ pendingVisible }: Props) => {
  return (
    pendingVisible && (
      <Backdrop hide={() => {}}>
        <Logo />
      </Backdrop>
    )
  );
};

export default Pending;
