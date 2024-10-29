import React, { useEffect, useState } from 'react';
import { Formik, FieldArray, Form } from 'formik';
import { Button, TextField, Checkbox, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import { EditUserRequest, UserListResponse } from '../../api/models/UserManagement';
import { DayOfWeek, getTranslatedDayOfWeek, getTranslatedUserRole, UserRole } from '../../models/Enums';
import { getUser, getUsers, putUser } from '../../api/user-management';
import { showAlert } from '../../components/common/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface UserFormValues extends EditUserRequest {}

const userSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  birthDate: Yup.date().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  role: Yup.number().required('Required'),
  period: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  supervisorId: Yup.number().nullable(),
  scheduleBlocks: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.string().required('Required'),
      endTime: Yup.string().required('Required'),
      weekDay: Yup.number().required('Required'),
      observation: Yup.string().nullable(),
    }),
  ),
});

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id ?? '', 10);
  const [initialValues, setInitialValues] = useState<UserFormValues | null>(null);
  const [supervisor, setSupervisor] = useState<UserListResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(userId);
        if (response.success === true) {
          const formattedUserData = {
            ...response.data!,
            supervisorId: response.data?.supervisorId ?? undefined,
            birthDate: response.data!.birthDate.split('T')[0],
          };
          setInitialValues(formattedUserData);
        } else if (response.message) {
          showAlert(response.message, 'error');
          navigate('/user-management');
        } else {
          showAlert('Login failed. Please check your credentials.', 'error');
          navigate('/user-management');
        }
      } catch (error) {
        showAlert('Login failed. Please check your credentials.', 'error');
        navigate('/user-management');
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        if (response.success === true) {
          setSupervisor(response.data?.filter((o) => o.role === UserRole.supervisor)!);
        } else if (response.message) {
          showAlert(response.message, 'error');
        } else {
          showAlert('Falha ao efetuar login. Por favor, verifique suas credenciais.', 'error');
        }
      } catch (error) {
        showAlert('Falha ao carregar usuários.', 'error');
      }
    };

    fetchUserData();
    fetchUsers();
  }, []);

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const formattedTimeSpan = values.scheduleBlocks.map((block) => ({
        ...block,
        startTime: block.startTime.split(':').length < 3 ? `${block.startTime}:00` : block.startTime,
        endTime: block.endTime.split(':').length < 3 ? `${block.endTime}:00` : block.endTime,
      }));
      const formattedValues = {
        ...values,
        scheduleBlocks: formattedTimeSpan,
      };
      const response = await putUser(userId, formattedValues);
      if (response.success === true) {
        showAlert('Usuário editado com sucesso!', 'success');
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

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Edição de Usuário</h2>

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
              label="Data de nascimento"
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
              <h3 className="text-lg font-semibold mb-2">Bloqueios de agendamento</h3>
              <FieldArray name="scheduleBlocks">
                {({ remove, push }) => (
                  <div className="mb-2">
                    {values.scheduleBlocks.map((block, index) => (
                      <div key={index} className="flex flex-col bg-gray-100 p-4 rounded-lg mb-4 shadow-sm gap-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Adicionar novo bloqueio
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
            Salvar mudanças
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUser;
