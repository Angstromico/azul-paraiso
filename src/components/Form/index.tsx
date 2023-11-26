import { useState, useMemo, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FORM } from 'q'
import { type FormInfo } from 't'
import { Formik, Form, FormikProps, Field, ErrorMessage } from 'formik'
import SelectComponent from 'react-select'
import style from './style.module.scss'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { useBearStore } from 's'

interface Select {
  options: { option: string }[]
}

interface Option {
  value: string
  label: string
}

interface Values {
  interested: string
  preference: string
  message: string
  name: string
  mail: string
  phone: string
}

interface FormStyle {
  contactPage?: boolean
}

const apiKey = import.meta.env.VITE_APP_RECAPTCHA_KEY
const FormAzul = ({ contactPage }: FormStyle) => {
  const { loading, error, data } = useQuery(GET_FORM)
  const [selectOptions, setSelectOptions] = useState<Select | null>(null)
  const [validate, setValidate] = useState(false)
  let SelectedOps: Select
  const { op, setOp, setFormOptions } = useBearStore()

  const ourSelectOptions = useMemo<Option[]>(() => {
    if (selectOptions !== null) {
      const ourOps = selectOptions.options
      const myOptions = ourOps.map((opt) => {
        const { option } = opt
        const currentOption = { value: option, label: option }
        return currentOption
      })
      return myOptions
    } else {
      return [{ value: '', label: '' }]
    }
  }, [selectOptions])

  const validateForm = () => setValidate(true)

  const onSubmit = (values: Values) => {
    if (!validate) alert('You must validate')
    if (validate) console.log(values)
  }
  const captchaWidth = useCallback(() => {
    const captcha = document.getElementById('recaptchaContainer')
    const firstDiv = captcha?.firstElementChild as HTMLDivElement
    if (firstDiv) firstDiv.style.width = '100%'
    const secondDiv = firstDiv?.firstElementChild as HTMLDivElement
    secondDiv.style.width = '100%'
    const theOneDiv = secondDiv?.firstElementChild as HTMLDivElement
    theOneDiv.style.width = '100%'
    const innerDiv = theOneDiv.firstElementChild as HTMLDivElement
    innerDiv.style.width = '100%'
    const iframe = innerDiv.firstElementChild as HTMLDivElement
    const textarea = theOneDiv?.children[1] as HTMLDivElement
    textarea.style.width = '100%'
    iframe.style.width = '100%'
  }, [])

  useEffect(() => {
    if (!loading && SelectedOps) {
      setSelectOptions(SelectedOps)
      setTimeout(() => captchaWidth(), 500)
      const ourOps = SelectedOps.options
      const formOptions = {
        option1: ourOps[0].option,
        option2: ourOps[1].option,
        option3: ourOps[2].option,
      }
      setFormOptions(formOptions)
    }
  }, [loading, SelectedOps, captchaWidth, setFormOptions])

  const azul = 'hsl(191, 89%, 31%)'

  if (loading) return
  if (error) return

  const formInfo: FormInfo = data.form.data.attributes
  const { SelectInput, Checkbox, Textbox, Name, Mail, Phone, Btn } = formInfo
  const { Legend, label, Options } = SelectInput
  const { legend: LegendCheck, label1, label2 } = Checkbox

  SelectedOps = { options: Options }

  const initialValues = {
    interested: op,
    preference: label2,
    message: '',
    name: '',
    mail: '',
    phone: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(Name.error),

    mail: Yup.string().email(Mail.formatError).required(Mail.error),
  })

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<Values>) => (
        <Form className={`${style.form} ${contactPage ? style.bigger : ''}`}>
          <div>
            <div className={style.inputContainer}>
              <label htmlFor='interested'>{label}</label>
              <SelectComponent
                value={op ? ourSelectOptions.find((o) => o.value === op) : null}
                id='interested'
                name='interested'
                options={ourSelectOptions}
                filterOption={(option) => option.value !== Legend}
                placeholder={Legend}
                onChange={(option) => {
                  props.setFieldValue(
                    'interested',
                    option.value ? option.value : ''
                  )
                  setOp(option.value ? option.value : '')
                }}
                className={'w-full md:w-[90%] text-azul focus:bg-white'}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: state.isFocused
                      ? '0.3px solid rgba(99, 99, 99, 0.5)'
                      : '0.3px solid rgba(99, 99, 99, 0.5)',
                    borderColor: '#636363',
                    boxShadow: state.isFocused
                      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
                      : 'none',
                    '&:hover': {
                      border: state.isFocused
                        ? '1px solid rgba(99, 99, 99, 0.5)'
                        : '1px solid rgba(99, 99, 99, 0.5)',
                      boxShadow:
                        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                    },
                    cursor: 'pointer',
                    height: '2.8rem',
                  }),

                  menu: (baseStyles) => ({
                    ...baseStyles,
                    marginTop: '2px',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: 'hsl(191, 89%, 45%)',
                    fontWeight: 'light',
                    fontFamily: 'Lato-Light, sans-serif',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: azul,
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: state.isSelected ? azul : azul,
                    backgroundColor: state.isSelected ? '' : '',
                    cursor: 'pointer',
                    hover: '',
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    color: state.isFocused ? azul : azul, // Custom colour
                    transform: state.isFocused ? '' : 'rotate(180deg)',
                  }),
                }}
              />
            </div>
            <div className={style.inputContainer}>
              <label>{LegendCheck}</label>
              <div
                className={style.radios}
                role='group'
                aria-labelledby='my-radio-group'
              >
                <label
                  htmlFor='preference'
                  className={`${contactPage ? style.blue : ''}`}
                >
                  <Field
                    type='radio'
                    id='preference'
                    name='preference'
                    value={label1}
                  />
                  {label1}
                </label>
                <label>
                  <Field type='radio' name='preference' value={label2} />
                  {label2}
                </label>
              </div>
              <div className={style.inputContainer}>
                <label htmlFor='message'>{Textbox.label}</label>
                <Field
                  className={`${contactPage ? style.taller : ''}`}
                  as={Textbox.type}
                  id='message'
                  name='message'
                />
              </div>
            </div>
          </div>
          <div>
            <div className={style.inputContainer}>
              <label htmlFor='name'>{Name.label}</label>
              <Field type={Name.type} id='name' name='name' />
              <ErrorMessage
                name='name'
                component='div'
                className={style.error}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor='mail'>{Mail.label}</label>
              <Field type={Mail.type} id='mail' name='mail' />
              <ErrorMessage
                name='mail'
                component='div'
                className={style.error}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor='phone'>{Phone.label}</label>
              <Field type={Phone.type} id='phone' name='phone' />
            </div>
            <div
              className={style.recaptcha}
              style={{ transform: 'scale(0.85)', transformOrigin: '0 0' }}
              id='recaptchaContainer'
            >
              <ReCAPTCHA sitekey={apiKey} onChange={validateForm} />
            </div>

            <button type='submit'>{Btn}</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default FormAzul
