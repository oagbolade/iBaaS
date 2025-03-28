/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useCreateBulkUpload } from '@/api/operation/useBulkUpload';
import { BulkUpload } from '@/features/Operation/Forms/BulkUpload';
import { mockToastActions } from '@/mocks';

// Mock required modules and hooks
const mutateMock = jest.fn();

jest.mock('../../../api/operation/useBulkUpload', () => ({
  useCreateBulkUpload: jest.fn(() => ({
    mutate: mutateMock
  }))
}));

jest.mock('../../../api/operation/useBatchPosting', () => ({
  useGetGenerateBatchNo: jest.fn(() => ({ batchno: 'BATCH1234' }))
}));

jest.mock('../../../utils/toast', () => ({
  toast: jest.fn()
}));

describe('BulkUpload Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateBulkUpload as jest.Mock).mockReturnValue({
      mutate: mutateMock
    });
  });

  it('renders the component with initial fields', () => {
    render(<BulkUpload />);

    expect(screen.getByText('Bulk Upload')).toBeInTheDocument();
    expect(screen.getByText('Upload Template')).toBeInTheDocument();
    expect(screen.getByText('Download Template below')).toBeInTheDocument();

    // Check for initial batch number
    expect(screen.getByLabelText('Batch No')).toHaveValue('BATCH1234');
  });

  it('validates and accepts a valid file upload', async () => {
    render(<BulkUpload />);
    const fileInput = screen.getByText(/Tap here to upload your document/i);

    const validFile = new File(['content'], 'valid.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    fireEvent.change(fileInput!, { target: { files: [validFile] } });

    expect(
      screen.getByText('Xlsx. File size, no more than 10MB')
    ).toBeInTheDocument();
  });

  it('handles template download', async () => {
    render(<BulkUpload />);

    const downloadButton = screen.getByText(/Download Template below/);

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://res.cloudinary.com/oladayoagbolade/raw/upload/v1721044194/hqofgunzsz45itce3ylk.xlsx'
      },
      writable: true
    });

    fireEvent.click(downloadButton);

    expect(window.location.href).toBe(
      'https://res.cloudinary.com/oladayoagbolade/raw/upload/v1721044194/hqofgunzsz45itce3ylk.xlsx'
    );
  });

  it('submits the form with valid data', async () => {
    const handleFileChange = jest.fn();
    const setFieldValue = jest.fn();
    render(
      <ToastMessageContext.Provider value={mockToastActions}>
        <Formik
          initialValues={{
            file: null,
            batchNumber: '',
            fileType: '',
            transactionAmount: ''
          }}
          onSubmit={(values) => mutateMock(values)}
        >
          <BulkUpload
            isSubmitting={false}
            setIsSubmitting={jest.fn()}
            onFileChange={(event: any) => {
              const file = event.target.files ? event.target.files[0] : null;
              if (file) {
                setFieldValue('testfile.xlsx', file); // Correctly update the form state with the file
              }
            }}
          />
        </Formik>
      </ToastMessageContext.Provider>
    );
    const fileInput = screen.getByText(/upload template/i);
    const validFile = new File(['content'], 'testfile.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    const batchInput = screen.getByLabelText(/Batch No/i);
    const submitIcon = screen.getByTestId('upload-icon');
    fireEvent.click(submitIcon);
    fireEvent.change(batchInput, { target: { value: 'BATCH1234' } });
    const selectElement = screen.getByLabelText(/Ms Office Excel Type/i);
    fireEvent.mouseDown(selectElement);
    const option = await screen.findByText(/Ms-Excel Office 2004/i);
    fireEvent.click(option);
    const transactionInput = screen.getByLabelText(/Total Transaction Amount/i);
    fireEvent.change(transactionInput, { target: { value: '23' } });
    expect(batchInput).toHaveValue('BATCH1234');
    expect(transactionInput).toHaveValue('23');
    expect(screen.getByText('bulkposting.xlsx')).toBeInTheDocument();
    const submitButton = screen.getByText('submit alias');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Tap here to upload your document/i)
      ).toBeInTheDocument();
    });
  });
});
