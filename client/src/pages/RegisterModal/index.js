import Modal from '../../components/Modal';
import RegisterForm from '../../components/RegisterForm';

export default function RegisterModal({ closeModal }) {
  const disclaimerStyles = {
    color: '#818181',
    fontSize: '0.8em',
  };

  return (
    <Modal
      height='660px'
      layout={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <RegisterForm closeModal={closeModal} />

      {/* bottom disclaimer */}
      <p style={disclaimerStyles}>
        Note: creating an account does not apply to the real Twitter, this is just a clone for my
        portfolio. Data used for this clone will not be shared, and is stored securely.
      </p>
    </Modal>
  );
}
