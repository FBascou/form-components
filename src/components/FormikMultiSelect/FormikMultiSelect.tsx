import './FormikMultiSelect.scss'
import { useField } from 'formik'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useRef, useState } from 'react'

export interface MultiSelectOptionInterface {
  label: string
  value: string | number
}

interface MultiSelectInterface {
  multiple: true
  value: MultiSelectOptionInterface[]
  onChange: (value: MultiSelectOptionInterface[]) => void
}

interface SingleSelectInterface {
  multiple?: false
  value?: MultiSelectOptionInterface
  onChange: (value: MultiSelectOptionInterface | undefined) => void
}

type FormikMultiSelectType = {
  orientation: string
  label?: string
  labelKor?: boolean
  // uniqueTitle?: string
  // uniqueValue?: any
  // placeholder?: string
  // id?: string
  // name?: string
  // disabled?: boolean
  // required?: boolean
  options: MultiSelectOptionInterface[]
} & (MultiSelectInterface | SingleSelectInterface)

const FormikMultiSelect = ({
  orientation,
  label,
  labelKor,
  // uniqueTitle,
  // uniqueValue,
  // placeholder,
  multiple,
  value,
  onChange,
  options,
}: // ...props
FormikMultiSelectType) => {
  // const [field, meta] = useField(props)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>

  const toggleOpen = () => {
    setIsOpen((open) => !open)
  }

  const toggleBlur = () => {
    setIsOpen(false)
  }

  const handleClearOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    multiple ? onChange([]) : onChange(undefined)
  }

  const handleSelectOption = (
    event: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
    option: MultiSelectOptionInterface,
  ) => {
    event.stopPropagation()
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((prev) => prev !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
    setIsOpen(false)
  }

  const isOptionSelected = (option: MultiSelectOptionInterface) => {
    return multiple ? value.includes(option) : option === value
  }

  const handleRemoveOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: MultiSelectOptionInterface,
  ) => {
    event.stopPropagation()
    handleSelectOption(event, option)
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target != containerRef.current) return
      switch (event.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev)
          if (isOpen) handleSelectOption(event, options[highlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (event.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
      }
    }

    containerRef.current?.addEventListener('keydown', handler)

    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`formik-multi-select-container formik-multi-select-${orientation}`}
      onBlur={toggleBlur}
      onClick={toggleOpen}
    >
      <div className="formik-multi-select">
        <span className="formik-multi-select-value">
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  className="formik-multi-select-option-badge"
                  onClick={(event) => handleRemoveOption(event, v)}
                >
                  {v.label}{' '}
                  <span className="formik-multi-select-remove-btn">
                    <CloseIcon className="formik-multi-select-remove-svg" />
                  </span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          className="formik-multi-select-close-icon"
          onClick={(event) => handleClearOptions(event)}
        >
          <CloseIcon />
        </button>
        <div className="formik-multi-select-divider"></div>
        <ArrowDropDownIcon className="formik-multi-select-drop-down-icon" />
        <ul className={`formik-multi-select-options ${isOpen ? 'show' : ''}`}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`formik-multi-select-option ${
                isOptionSelected(option) ? 'selected' : ''
              } ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={(event) => handleSelectOption(event, option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {/* {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null} */}
    </div>
  )
}

export default FormikMultiSelect
