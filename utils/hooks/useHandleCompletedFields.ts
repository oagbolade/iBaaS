import React from 'react';
import { progressCompletionInitialValues, ProgressType } from '@/context/CustomerCreationContext';

type ValidationKeysMapper = {
    corporateCustomerPersonalDetails?: string[];
    personalDetails?: string[];
    businessDetails?: string[];
    nextOfKinDetails?: string[];
    identificationDetails?: string[];
    referrerDetails?: string[];
};

type HandleCompletedFieldsFunction<T> = (values: T) => void;

interface UseHandleCompletedFieldsReturn<T> {
    handleCompletedFields: HandleCompletedFieldsFunction<T>;
}

export const useHandleCompletedFields = <T extends { [key: string]: any }>(
    setCompleted: React.Dispatch<React.SetStateAction<Record<string, ProgressType>>>,
    validationKeysMapper: ValidationKeysMapper
): UseHandleCompletedFieldsReturn<T> => {
    const handleCompletedFields: HandleCompletedFieldsFunction<T> = (values: T) => {
        setCompleted(progressCompletionInitialValues);

        const handleDetailProgress = (detailType: keyof ValidationKeysMapper) => {
            const detailKeys = validationKeysMapper[detailType];
            detailKeys?.forEach((detail) => {
                if (values[detail]?.toString().trim().length > 0) {
                    setCompleted((prev) => ({
                        ...prev,
                        [detailType]: {
                            ...prev[detailType],
                            progress: prev[detailType].progress + 1
                        }
                    }));
                }
            });
        };

        Object.keys(validationKeysMapper).forEach((key) => {
            handleDetailProgress(key as keyof ValidationKeysMapper);
        });
    };

    return { handleCompletedFields };
};