import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CreateLeadModal } from './CreateLeadModal';
import { leadsApi } from '../../api/leadsApi';

const renderWithRedux = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { [leadsApi.reducerPath]: leadsApi.reducer },
    middleware: (gDM) => gDM().concat(leadsApi.middleware),
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('CreateLeadModal', () => {
  it('renders correctly when open', () => {
    renderWithRedux(<CreateLeadModal isOpen={true} onOpenChange={jest.fn()} />);
    expect(screen.getByText('Новая сделка CRM')).toBeInTheDocument();
  });

  it('validates mandatory fields on empty submit', async () => {
    renderWithRedux(<CreateLeadModal isOpen={true} onOpenChange={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Создать' }));

    await waitFor(() => {
      expect(screen.getByText('Название обязательно')).toBeInTheDocument();
      expect(screen.getByText('Укажите бюджет')).toBeInTheDocument();
      expect(screen.getByText('Email обязателен')).toBeInTheDocument();
    });
  });
});
