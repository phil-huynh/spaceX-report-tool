import { useForm, SubmitHandler } from "react-hook-form"
import { useStore } from "../ContextStore.tsx"
import inputValidator from "../validation/inputValidator.ts"

type Inputs = {
  date: Date
  title: string
  author: string
  body: string
}

export default function NewReport() {

  const { updateReports } = useStore()

  if(!updateReports) {
    throw new Error("function cannot be undefined")
  }

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

    <div className="form-container">
      <form className="report-form glass" onSubmit={handleSubmit(onSubmit)}>

        <input
          {...register("title", {
            required: "A title is required",
            validate: inputValidator
          })}
          className="form-input"

          placeholder="title"
        />
        <p className="error">{errors.title?.message}</p>

        <input

          {...register("author", {
            required: "An author is required",
            validate: inputValidator
          })}
          className="form-input"
          placeholder="author"
        />
        <p className="error">{errors.author?.message}</p>
        <textarea
          className="report-body"
          rows={30}
          cols={700}
          {...register("body", {
            validate: inputValidator
          })}
          placeholder="Enter your report here"
        />
        <p className="error">{errors.body?.message}</p>

        <input className="form-submit" type="submit"/>
      </form>
    </div>
  )
}