import withForm from "./form";

export default withForm(
  "LICENCIA",
  "license",
  {
    id: "",
    name: "",
    expiration: ""
  },
  {
    id: "ID",
    name: "NOMBRE",
    expiration: "VENCIMIENTO"
  }
)();
