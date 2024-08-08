const handleInputChange = (e, setFormFields, setError) => {
  const { name, value, type, checked } = e.target;
  const inputValue = type === "checkbox" ? checked : value;

  setFormFields((prevFields) => ({
    ...prevFields,
    [name]: inputValue,
  }));
  setError((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

export default handleInputChange;
