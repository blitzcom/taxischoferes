import withForm from "./form";

export default withForm(
  "PERMISO",
  "permission",
  {
    id: "",
    expiration: "",
    issuer: ""
  },
  {
    id: "ID",
    expiration: "EXPIRACIÓN",
    issuer: "EXPEDIDO POR"
  }
)();
