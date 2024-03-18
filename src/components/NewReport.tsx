import { useForm, SubmitHandler } from "react-hook-form"
import { useStore } from "../ContextStore.tsx"
import isCard from "../validation/validators/isCreditCard.ts"
import containsHTML from "../validation/validators/containsHTML.ts"

type Inputs = {
  date: string
  time: string
  title: string
  author: string
}


export default function NewReport() {

  const { updateReports } = useStore()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const date = new Date(Date.now())
    data = {
      ...data,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    }
    updateReports(data)
    reset()
  }

  console.log('title', watch("title"), 'author', watch("author"))


  return (

    <form className="report-form" onSubmit={handleSubmit(onSubmit)}>

      <input
        {...register("title", {
          validate: {
            containsHTML: (fieldValue) => {
              return (
                !containsHTML(fieldValue) || "Invalid entry. Field cannot contain HTML"
              )
            },
            notCreditCard: (fieldValue) => {
              return (
                !isCard(fieldValue) || "Cannot use Credit Card number in this field"
              )
            }
          }
        })}
        style={{width: "20rem"}}
        placeholder="title"
      />
      <p className="error">{errors.title?.message}</p>

      <input
        {...register("author", {
          // required: true,
          validate: {
            containsHTML: (fieldValue) => {
              return (
                !containsHTML(fieldValue) || "Invalid entry. Field cannot contain HTML"
              )
            },
            notCreditCard: (fieldValue) => {
              return (
                !isCard(fieldValue) || "Cannot use Credit Card number in this field"
              )
            }
          }
        })}
        style={{width: "20rem"}}
        placeholder="author"
      />
      <p className="error">{errors.title?.message}</p>
      {/* errors will return when field validation fails  */}
      {/* {errors.author && <span>This field is required</span>} */}

      <input style={{width: "5rem"}} type="submit" />
    </form>
  )
}