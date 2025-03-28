// hooks/useFormProgress.ts
import { useState, useEffect } from 'react';
import { getIn } from 'formik';

type RequiredFields = Record<string, string[]>;

type ProgressType = {
  total: number;
  progress: number;
};

interface UseFormProgressProps {
  requiredFields: RequiredFields;
  values: Record<string, any>;
}

const useFormProgress = ({ requiredFields, values }: UseFormProgressProps) => {
  const [completed, setCompleted] = useState<Record<string, ProgressType>>(
    () => {
      const initial: Record<string, ProgressType> = {};
      Object.keys(requiredFields).forEach((key) => {
        initial[key] = { total: requiredFields[key].length, progress: 0 };
      });
      return initial;
    }
  );

  useEffect(() => {
    const newCompleted: Record<string, ProgressType> = { ...completed };
    Object.keys(requiredFields).forEach((key) => {
      const fields = requiredFields[key];
      const progress = fields.reduce((count, field) => {
        const value = getIn(values, field);
        return (
          count +
          (value !== undefined && value !== null && value !== '' ? 1 : 0)
        );
      }, 0);
      newCompleted[key] = { total: fields.length, progress };
    });
    setCompleted(newCompleted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return completed;
};

export default useFormProgress;
