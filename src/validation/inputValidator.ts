import isCard from "./validators/isCreditCard.ts"
import containsHTML from "./validators/containsHTML.ts"
import containsSQL from "./validators/containsSQL.ts"


const inputValidator = {
  containsHTML: (fieldValue: string) => (
    !containsHTML(fieldValue) || "Invalid entry. Field cannot contain HTML"
  ),
  notCreditCard: (fieldValue: string) => (
    !isCard(fieldValue) || "Cannot use Credit Card number in this field"
    ),
  containsSQL: (fieldValue: string) => (
    !containsSQL(fieldValue) || "Invalid entry. This could be SQL. Rephrase your input"
  ),
}

export default inputValidator