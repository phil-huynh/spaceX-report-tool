import { useForm, SubmitHandler } from "react-hook-form"
import { useStore } from "../ContextStore.tsx"
import inputValidator from "../validation/inputValidator.ts"

type Inputs = {
  date: object
  title: string
  author: string
}


export default function NewReport() {

  const { updateReports } = useStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data = {
      ...data,
      date: new Date(Date.now())
    }
    updateReports(data)
    reset()
  }

  return (

    <form className="report-form" onSubmit={handleSubmit(onSubmit)}>

      <input
        {...register("title", {
          required: "A title is required",
          validate: inputValidator
        })}
        style={{width: "20rem"}}
        placeholder="title"
      />
      <p className="error">{errors.title?.message}</p>

      <input
        {...register("author", {
          required: "An author is required",
          validate: inputValidator
        })}
        style={{width: "20rem"}}
        placeholder="author"
      />
      <p className="error">{errors.author?.message}</p>

      <input style={{width: "5rem"}} type="submit" />
    </form>
  )
}