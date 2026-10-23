import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { useCreateLeadMutation } from '../../api/leadsApi';
import { CreateLeadDto } from '../../types/lead';
import styles from './CreateLeadModal.module.scss';

interface CreateLeadModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({ isOpen, onOpenChange }) => {
  const [createLead, { isLoading }] = useCreateLeadMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadDto>({
    defaultValues: {
      title: '',
      budget: 0,
      contactEmail: '',
      status: 'NEW',
    },
  });

  const onSubmit = async (data: CreateLeadDto) => {
    try {
      await createLead({
        ...data,
        budget: Number(data.budget),
      }).unwrap();
      reset();
      onOpenChange(false);
    } catch (err) {
      console.error('Lead creation failed:', err);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Новая сделка CRM</Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="title">Название</label>
              <input
                id="title"
                {...register('title', {
                  required: 'Название обязательно',
                  minLength: { value: 3, message: 'Минимум 3 символа' },
                })}
              />
              {errors.title && <span className={styles.error}>{errors.title.message}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="budget">Бюджет (₽)</label>
              <input
                id="budget"
                type="number"
                {...register('budget', {
                  required: 'Укажите бюджет',
                  min: { value: 1, message: 'Бюджет должен быть больше 0' },
                })}
              />
              {errors.budget && <span className={styles.error}>{errors.budget.message}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="contactEmail">Email клиента</label>
              <input
                id="contactEmail"
                type="email"
                {...register('contactEmail', {
                  required: 'Email обязателен',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Некорректный email',
                  },
                })}
              />
              {errors.contactEmail && (
                <span className={styles.error}>{errors.contactEmail.message}</span>
              )}
            </div>

            <div className={styles.actions}>
              <Dialog.Close asChild>
                <button type="button" className={`${styles.btn} ${styles.btnCancel}`}>
                  Отмена
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.btn} ${styles.btnSubmit}`}
              >
                {isLoading ? 'Сохранение...' : 'Создать'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
