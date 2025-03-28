import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';
import { FormSelectField } from '@/components/FormikFields';

const renderFormik = () => render(<Formik initialValues={{}} onSubmit={() => { }}>
    <FormSelectField options={[{ name: 'Jay', value: '001' }, { name: 'Su', value: '002' }]} name='dept' label='Department Name' />
</Formik>
);

describe('FormSelectField Test', () => {
    it('should display label', async () => {
        renderFormik();

        expect(await screen.findByLabelText('Department Name')).toBeInTheDocument();
    });

    it('should display dropdown and open menu', async () => {
        renderFormik();

        // Open dropdown
        const dropdownButton = screen.getByRole('combobox', { name: /Department Name/i });
        expect(dropdownButton).toBeInTheDocument();
        await userEvent.click(dropdownButton);

        // Check options appear
        expect(await screen.findByRole('option', { name: 'Jay' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Su' })).toBeInTheDocument();
    });

    it('should select an option and display selected value', async () => {
        renderFormik();

        // Open dropdown and select an option
        const dropdownButton = screen.getByRole('combobox', { name: /Department Name/i });
        await userEvent.click(dropdownButton);
        await userEvent.click(await screen.findByRole('option', { name: 'Jay' }));

        // Check the selected option is displayed
        expect(dropdownButton).toHaveTextContent('Jay');
    });
});