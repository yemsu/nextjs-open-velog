import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { fetchPostBlog } from "@/store/board"
import Input from "@/components/elements/Input"
import Button from "@/components/elements/Button"
import useInputs from "@/hooks/useInputs"
import { PostBlogPayLoad } from "@/api/blog"
function index() {
  const [forms, onChange, reset] = useInputs({
    title: '',
    introduce: ''
  })
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch(fetchPostBlog(forms))
    reset()
  }

  return (
    <div>
      <h2>Boards</h2>
      <Input
        type="text"
        name="title"
        label="제목"
        value={forms.title}
        onChange={onChange}
      />
      <Input
        type="text"
        name="introduce"
        label="블로그 소개"
        value={forms.introduce}
        onChange={onChange}
      />
      <Button
        styleType="round"
        bgColor="primary"
        size="medium" buttonText="업로드" onClick={onSubmit}
      />
    </div>
  )
}

export default index