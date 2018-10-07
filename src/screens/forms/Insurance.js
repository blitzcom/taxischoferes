import withForm from "./form";

export default withForm(
  "SEGURO",
  "insurance",
  {
    id: "",
    issuer: "",
    expiration: ""
  },
  {
    id: "ID",
    issuer: "EXPEDIDO POR",
    expiration: "EXPIRACIÓN"
  }
)();
