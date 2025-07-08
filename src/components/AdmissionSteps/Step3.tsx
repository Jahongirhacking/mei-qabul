import { useTranslation } from 'react-i18next';

import { BachelorForm } from '@/components/forms/stepForms/BachelorForm';

export function AdmissionStep3() {
  const { t } = useTranslation();
  return (
    <div className="md:min-w-[500px]">
      <h1 className="font-semibold text-lg mb-6">{t('admission.educationInfo')}</h1>

      <div>
        <BachelorForm />
      </div>
    </div>
  )
}
