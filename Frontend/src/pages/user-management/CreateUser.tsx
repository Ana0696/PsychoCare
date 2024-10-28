import React from 'react';
import { Formik, FieldArray, Form } from 'formik';
import { Button, TextField, Checkbox, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CreateUserRequest } from '../../api/models/UserManagement';
import { DayOfWeek, getTranslatedDayOfWeek, getTranslatedUserRole, UserRole } from '../../models/Enums';
import { registerUser } from '../../api/user-management';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/Alert';

interface UserFormValues extends CreateUserRequest {
  confirmPassword: string;
}

const userSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  birthDate: Yup.date().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  role: Yup.number().required('Required'),
  period: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  scheduleBlocks: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.string().required('Required'),
      endTime: Yup.string().required('Required'),
      weekDay: Yup.number().required('Required'),
      observation: Yup.string().nullable(),
    }),
  ),
});

const CreateUser: React.FC = () => {
  const initialValues: UserFormValues = {
    name: '',
    surname: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    email: '',
    period: '',
    password: '',
    confirmPassword: '',
    role: UserRole.secretary,
    isActive: true,
    scheduleBlocks: [],
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const response = await registerUser(values);
      if (response.success === true) {
        showAlert('Usuário cadastrado com sucesso!', 'success');
        navigate('/user-management');
      } else if (response.message) {
        showAlert(response.message, 'error');
      } else {
        showAlert('Login failed. Please check your credentials.', 'error');
      }
    } catch (error) {
      showAlert('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Novo usuário</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Sobrenome"
              name="surname"
              variant="outlined"
              fullWidth
              value={values.surname}
              onChange={handleChange}
              error={touched.surname && Boolean(errors.surname)}
              helperText={touched.surname && errors.surname}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Telefone"
              name="phoneNumber"
              variant="outlined"
              fullWidth
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              label="Confirme a senha"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              value={values.confirmPassword}
              onChange={handleChange}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            <TextField
              label="Data de Nascimento"
              name="birthDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={values.birthDate}
              onChange={handleChange}
              error={touched.birthDate && Boolean(errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
            />
            <TextField
              select
              label="Função"
              name="role"
              variant="outlined"
              fullWidth
              value={values.role}
              onChange={(e) => {
                const roleValue = parseInt(e.target.value, 10) as UserRole;
                setFieldValue('role', roleValue);

                if (roleValue !== UserRole.intern) {
                  setFieldValue('period', '');
                }
              }}
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && errors.role}
            >
              {Object.values(UserRole)
                .filter((value) => typeof value === 'number')
                .map((value) => (
                  <MenuItem key={value} value={value}>
                    {getTranslatedUserRole(value as UserRole)}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              label="Gênero"
              name="gender"
              variant="outlined"
              fullWidth
              value={values.gender}
              onChange={handleChange}
              error={touched.gender && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
            />
            {values.role === UserRole.intern && (
              <TextField
                label="Período"
                name="period"
                variant="outlined"
                fullWidth
                value={values.period}
                onChange={handleChange}
                error={touched.period && Boolean(errors.period)}
                helperText={touched.period && errors.period}
              />
            )}
          </div>

          <div className="mt-4">
            <Checkbox name="isActive" checked={values.isActive} onChange={handleChange} color="primary" />
            <span>Usuário ativo</span>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Bloqueio de agendamento</h3>
            <FieldArray name="scheduleBlocks">
              {({ remove, push }) => (
                <div className="mb-2">
                  {values.scheduleBlocks.map((block, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
                        <TextField
                          label="Horário inicial"
                          name={`scheduleBlocks.${index}.startTime`}
                          type="time"
                          fullWidth
                          value={block.startTime}
                          onChange={handleChange}
                          error={
                            touched.scheduleBlocks?.[index]?.startTime &&
                            Boolean((errors.scheduleBlocks?.[index] as any)?.startTime)
                          }
                          helperText={
                            touched.scheduleBlocks?.[index]?.startTime &&
                            (errors.scheduleBlocks?.[index] as any)?.startTime
                          }
                        />
                        <TextField
                          label="Horário final"
                          name={`scheduleBlocks.${index}.endTime`}
                          type="time"
                          fullWidth
                          value={block.endTime}
                          onChange={handleChange}
                          error={
                            touched.scheduleBlocks?.[index]?.endTime &&
                            Boolean((errors.scheduleBlocks?.[index] as any)?.endTime)
                          }
                          helperText={
                            touched.scheduleBlocks?.[index]?.endTime && (errors.scheduleBlocks?.[index] as any)?.endTime
                          }
                        />
                        <TextField
                          select
                          label="Dia da semana"
                          name={`scheduleBlocks.${index}.weekDay`}
                          fullWidth
                          value={block.weekDay}
                          onChange={handleChange}
                          error={
                            touched.scheduleBlocks?.[index]?.weekDay &&
                            Boolean((errors.scheduleBlocks?.[index] as any)?.weekDay)
                          }
                          helperText={
                            touched.scheduleBlocks?.[index]?.weekDay && (errors.scheduleBlocks?.[index] as any)?.weekDay
                          }
                        >
                          {Object.values(DayOfWeek)
                            .filter((value) => typeof value === 'number')
                            .map((value) => (
                              <MenuItem key={value} value={value}>
                                {getTranslatedDayOfWeek(value as DayOfWeek)}
                              </MenuItem>
                            ))}
                        </TextField>
                      </div>
                      <TextField
                        label="Observações"
                        name={`scheduleBlocks.${index}.observation`}
                        fullWidth
                        multiline
                        rows={3}
                        className="mt-4"
                        value={block.observation}
                        onChange={handleChange}
                      />
                      <div className="flex justify-end mt-2">
                        <RemoveCircleOutlineIcon color="secondary" onClick={() => remove(index)} />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    className="flex text-slate-900"
                    onClick={() =>
                      push({ startTime: '00:00:00', endTime: '00:00:00', weekDay: DayOfWeek.Monday, observation: '' })
                    }
                  >
                    Adicionar bloqueio de agendamento
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-6 bg-gradient-to-br from-slate-900 to-slate-700"
          >
            Criar novo usuário
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;
