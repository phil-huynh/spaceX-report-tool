import { useForm, SubmitHandler } from "react-hook-form"
import { useStore } from "../ContextStore.tsx"
import inputValidator from "../validation/inputValidator.ts"
import { Report } from "../../utils/types.ts"


export default function ReportForm() {

  const { updateReports, finalReportStash, setFinalReportStash } = useStore()

  if(!updateReports || !setFinalReportStash) throw new Error("function cannot be undefined")
  if(!finalReportStash) throw new Error("finalReportStash cannot be undefined")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Report>()

  const onSubmit: SubmitHandler<Report> = (data) => {
    data = {
      ...data,
      date: new Date(Date.now()),
      stash: finalReportStash
    }
    updateReports(data)
    setFinalReportStash([])
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
          className="report-form-body"
          rows={30}
          cols={700}
          {...register("report", {
            validate: inputValidator
          })}
          placeholder="Enter your report here"
        />
        <p className="error">{errors.report?.message}</p>

        <input className="form-submit" type="submit"/>
      </form>
    </div>
  )
}