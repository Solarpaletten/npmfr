// import React, { useState } from 'react';
// import Alert from '../../../components/Alert';
// import { Modal, Form } from '../../../components/Modal';
// import Field from '../../../components/Field';
// import api from '../../../utils/api';

// const UserCopyForm = ({ onShowForm, requery, user }) => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null); // TODO
//   const [error, setError] = useState(null);

//   const handleDelete = async (e, user) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post(`/users/${user.id}`);

//       requery();

//       setLoading(false);
//       onShowForm(false);
//     } catch (error) {
//       setError('Failed to copy user');
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal>
//       <Form
//         onSubmit={handleDelete}
//         onClose={() => onShowForm(false)}
//         loading={loading}
//         error={error}
//         buttonPositiveName={'Copy'}
//         buttonNegativeName={'Cancel'}
//       >
//         <h2>Copy User</h2>
//         Are you sure you want to copy {user.username} user?
//         <Alert variant='warning'>
//           Password will be setted as <b>default1234</b>. Ask user to update it
//           as soon as possible.
//         </Alert>
//       </Form>
//     </Modal>
//   );
// };

// export default UserCopyForm;
