import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem("lang", value);
    }

    return (
        <Select
            className='select-language'
            value={i18n.language}
            options={[
                { label: "Русский", value: 'ru' },
                { label: "O‘zbekcha", value: 'uz' }
            ]}
            onChange={changeLanguage}
        />
    )
}

export default SelectLanguage