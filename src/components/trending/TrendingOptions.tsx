import styled from "styled-components"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { SyntheticEvent } from "react";
import { Forms, InputCategory } from "@/types/form";
import InputList from "../elements/InputList";
import IrText from "../elements/IrText";

interface TrendingOptionsProps {
  forms: Forms
  onChange: (e: SyntheticEvent) => void
  date?: Date
  setDate?: (s: any) => void,
  onSubmit: () => void
}

const inputCategories: InputCategory[][] = [
  [
    {
      type: 'radio',
      id: 'man',
      name: 'gender',
      label: '남',
      value: 'M'
    },
    {
    type: 'radio',
    id: 'woman',
    name: 'gender',
    label: '여',
    value: 'F'
  }],
  [{
    type: 'radio',
    id: 'to19',
    name: 'ageRange',
    label: '0~19세',
    value: 'TO19'
  },
  {
    type: 'radio',
    id: 'to29',
    name: 'ageRange',
    label: '20~29세',
    value: 'TO29'
  },
  {
    type: 'radio',
    id: 'to39',
    name: 'ageRange',
    label: '30~39세',
    value: 'TO39'
  },
  {
    type: 'radio',
    id: 'to59',
    name: 'ageRange',
    label: '40~59세',
    value: 'TO59'
  },
  {
    type: 'radio',
    id: 'over69',
    name: 'ageRange',
    label: '60세 이상',
    value: 'OVER60'
  }],
]

function TrendingOptions(props: TrendingOptionsProps) {
  const {
    forms,
    onChange,
    date,
    setDate
  } = props

  return (
    <Section>
      <IrText text="검색 필터" />
      {
        setDate &&
          <DatePickerBox>
            <DatePickerStyled selected={date} onChange={setDate} />
          </DatePickerBox>
      }
      {
        inputCategories.map((inputList) => {
          return (
            <InputList
              key={inputList[0].id}
              inputList={inputList}
              forms={forms}
              wrapperStyle="row"
              onChange={onChange}
            />
          )
        })
      }
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-light-gray);
  > div {
    padding: 10px 20px;
    &:nth-child(n+3) {
      border-left: 1px solid var(--border-light-gray);
    }
  }
`

const DatePickerBox = styled.div`
  position: relative;
  &:before {
    display: block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 25px;
    font-size: var(--font-size-XS);
    transform: translateY(-50%);
    content: '📅';
  }  
`
const DatePickerStyled = styled(DatePicker)`
  width: 120px;
  height: auto;
  padding: 6px 10px 6px 30px;
  border: 1px solid var(--border-light-gray);
  border-radius: var(--border-radius-S);
  font-size: var(--font-size-S);
  color: inherit;
  cursor: pointer;
`

export default TrendingOptions