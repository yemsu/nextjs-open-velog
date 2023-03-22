import styled from "styled-components"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { SyntheticEvent } from "react";
import { Forms, InputCategory } from "@/types/form";
import InputList from "../elements/InputList";
import IrText from "../elements/IrText";
import Button from "../elements/Button";

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
    <section>
      <IrText text="검색 필터" />
      {
        setDate &&
          <DatePicker selected={date} onChange={setDate} />
      }
      {
        inputCategories.map((inputList) => {
          return (
            <InputList
              key={inputList[0].id}
              inputList={inputList}
              forms={forms}
              onChange={onChange}
            />
          )
        })
      }
    </section>
  )
}

export default TrendingOptions