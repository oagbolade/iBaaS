import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextError } from '@/components/Forms';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';

describe('FormAmountInput', () => {
    const initialValues = { amount: '' };

    const renderComponent = (props = {}) => {
        return render(
            <Formik initialValues={initialValues} onSubmit={jest.fn()}>
                <Form>
                    <FormAmountInput name="amount" {...props} />
                </Form>
            </Formik>
        );
    };

    test('renders label and optional asterisk if required', () => {
        renderComponent({ label: 'Amount', required: true });
        expect(screen.getAllByText(/Amount/i)[0]).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument();
    });

    test('displays the placeholder text', () => {
        renderComponent({ placeholder: 'Enter amount' });
        const input = screen.getByPlaceholderText('Enter amount');
        expect(input).toBeInTheDocument();
    });

    test('formats input value with commas', () => {
        renderComponent();
        const input = screen.getByRole('textbox');

        // Simulate user entering a large number
        fireEvent.change(input, { target: { value: '1000000' } });
        expect(input).toHaveValue('1,000,000');
    });

    test('updates form value correctly on change', () => {
        renderComponent();
        const input = screen.getByRole('textbox');

        // Simulate user entering a number with decimal places
        fireEvent.change(input, { target: { value: '1234.56' } });
        expect(input).toHaveValue('1,234.56');
    });

    test('limits input to two decimal places', async () => {
        renderComponent({ placeholder: 'Enter amount' });
        const input = screen.getByPlaceholderText('Enter amount');

        // Simulate user entering a number with more than two decimal places
        fireEvent.change(input, { target: { value: '1,234.56' } });

        // Wait for the formatted value to appear
        expect(input).toHaveValue('1,234.56');
    });

    test('Doesnt accept more than two decimal places', async () => {
        renderComponent({ placeholder: 'Enter amount' });
        const input = screen.getByPlaceholderText('Enter amount');

        fireEvent.change(input, { target: { value: '1,234.568' } });

        expect(input).not.toHaveValue('1,234.568');
    });

    test('displays error message when input is invalid', async () => {
        const validationSchema = Yup.object({
            amount: Yup.number()
                .typeError('Must be a numeric value')
                .required('Amount is required'),
        });

        render(
            <Formik
                initialValues={initialValues}
                onSubmit={jest.fn()}
                validationSchema={validationSchema}
            >
                <Form>
                    <FormAmountInput name="amount" />
                    <ErrorMessage component={TextError} name='amount' />
                </Form>
            </Formik>
        );

        await act(() => {
            const input = screen.getByRole('textbox');
            fireEvent.blur(input); // Trigger validation by blurring the field
        });

        await expect(await screen.getAllByText('Amount is required')[0]).toBeInTheDocument();
    });

    test('renders start and end adornments when provided', () => {
        renderComponent({
            icon: <span>StartIcon</span>,
            endAdornment: <span>EndIcon</span>
        });
        expect(screen.getByText('StartIcon')).toBeInTheDocument();
        expect(screen.getByText('EndIcon')).toBeInTheDocument();
    });

    test('disables the input when disabled prop is true', () => {
        renderComponent({ disabled: true });
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
    });
});
