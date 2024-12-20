import React, { useState } from 'react';
import { Formik, FieldArray, Form } from 'formik';
import { Button, TextField, Checkbox, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CreateUserRequest, UserListResponse } from '../../api/models/UserManagement';
import { DayOfWeek, getTranslatedDayOfWeek, getTranslatedUserRole, UserRole } from '../../models/Enums';
import { getUsers, registerUser } from '../../api/requests/user-management';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/Alert';
import MaskedInput from 'react-text-mask';

interface UserFormValues extends CreateUserRequest {
  confirmPassword: string;
}

const userSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  surname: Yup.string().required('Campo obrigatório'),
  birthDate: Yup.date().required('Campo obrigatório'),
  phoneNumber: Yup.string()
    .required('Campo obrigatório')
    .test('is-valid-phone', 'Telefone incompleto', (value) => !!value && value.replace(/\D/g, '').length === 11),
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas devem ser iguais')
    .required('Campo obrigatório'),
  role: Yup.number().required('Campo obrigatório'),
  period: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  supervisorId: Yup.number().nullable(),
  scheduleBlocks: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.string().required('Campo obrigatório'),
      endTime: Yup.string().required('Campo obrigatório'),
      weekDay: Yup.number().required('Campo obrigatório'),
      observation: Yup.string().nullable(),
    }),
  ),
});

const CreateUser: React.FC = () => {
  const [supervisor, setSupervisor] = useState<UserListResponse[]>([]);

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
    supervisorId: undefined,
    scheduleBlocks: [],
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const formattedValues = {
        ...values,
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
        scheduleBlocks: values.scheduleBlocks.map((block) => ({
          ...block,
          startTime: block.startTime.includes(':') ? `${block.startTime}:00` : block.startTime,
          endTime: block.endTime.includes(':') ? `${block.endTime}:00` : block.endTime,
        })),
      };
      const response = await registerUser(formattedValues);
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

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        if (response.success === true) {
          setSupervisor(response.data?.filter((o) => o.role === UserRole.supervisor || o.role === UserRole.manager)!);
        } else if (response.message) {
          showAlert(response.message, 'error');
        } else {
          showAlert('Falha ao efetuar login. Por favor, verifique suas credenciais.', 'error');
        }
      } catch (error) {
        showAlert('Falha ao carregar usuários.', 'error');
      }
    };

    fetchUsers();
  }, []);

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
            <MaskedInput
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              placeholder="(DDD) 00000-0000"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
              render={(ref, props) => (
                <TextField
                  {...props}
                  inputRef={ref}
                  label="Telefone"
                  name="phoneNumber"
                  variant="outlined"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              )}
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
                  setFieldValue('supervisorId', undefined);
                  setFieldValue('scheduleBlocks', []);
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
              select
              fullWidth
              variant="outlined"
              value={values.gender}
              onChange={handleChange}
              error={touched.gender && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
            >
              <MenuItem value="">Prefere não informar</MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Agênero">Agênero</MenuItem>
              <MenuItem value="Gênero Fluido">Gênero Fluido</MenuItem>
              <MenuItem value="Não Binário">Não Binário</MenuItem>
              <MenuItem value="Transgênero">Transgênero</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </TextField>
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
            {values.role === UserRole.intern && (
              <TextField
                select
                label="Orientador"
                name="supervisorId"
                variant="outlined"
                fullWidth
                value={values.supervisorId}
                onChange={handleChange}
                error={touched.supervisorId && Boolean(errors.supervisorId)}
                helperText={touched.supervisorId && errors.supervisorId}
              >
                {supervisor.map((o) => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </div>

          <div className="mt-4">
            <Checkbox name="isActive" checked={values.isActive} onChange={handleChange} color="primary" />
            <span>Usuário ativo</span>
          </div>

          {values.role === UserRole.intern && (
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
                              touched.scheduleBlocks?.[index]?.endTime &&
                              (errors.scheduleBlocks?.[index] as any)?.endTime
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
                              touched.scheduleBlocks?.[index]?.weekDay &&
                              (errors.scheduleBlocks?.[index] as any)?.weekDay
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
          )}

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
