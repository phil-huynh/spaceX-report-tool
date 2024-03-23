import { useForm, SubmitHandler } from "react-hook-form";
import { useStore } from "../../ContextStore.tsx";
import inputValidator from "../../validation/inputValidator.ts";
import { Report } from "../../../utils/types.ts";
import { Launch } from "../../../utils/types.ts";


export default function ReportForm() {

  const { updateReports, finalReportStash, setFinalReportStash, selectedStashItem, stash, setStash, setSelectedStashItem} = useStore();

  if (!updateReports || !setFinalReportStash || !setStash || !setSelectedStashItem) {
    throw new Error("function cannot be undefined");
  }
  if (!finalReportStash) throw new Error("finalReportStash cannot be undefined");
  if (!selectedStashItem) throw new Error("selectedStashItem cannot be undefined");
  if (!stash) throw new Error("stash cannot be undefined");

  const updateFinalStash: (launch: Launch) => void = (launch) => {
    finalReportStash
      .filter((stashItem: Launch) => stashItem.id === launch.id).length < 1 &&
        setFinalReportStash([...finalReportStash, launch]);
    setStash([...stash?.filter((stashItem: Launch) => stashItem.id !== launch.id) || []])

    if (stash?.filter((stashItem: Launch) => stashItem.id !== launch.id).length > 0) {
      selectedStashItem.id === stash[0].id ? setSelectedStashItem(stash[1]) : setSelectedStashItem(stash[0]);
    }
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Report>();

  const onSubmit: SubmitHandler<Report> = (data) => {
    data = {
      ...data,
      date: new Date(Date.now()),
      stash: finalReportStash
    };
    updateReports(data);
    setFinalReportStash([]);
    reset();
  };

  return (
    <div className="report-form-container">
        <div className="stash-viewer-buttons">
          <button
            className="stash-add"
            onClick={()=> updateFinalStash(selectedStashItem)}
          >
            {'Add to Final ->'}
          </button>
        </div>

      <form className="report-form glass" onSubmit={handleSubmit(onSubmit)}>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <input className="stash-add" type="submit"/>
        </div>

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

      </form>
    </div>
  );
}