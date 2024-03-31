import { useController } from "react-hook-form";

function ToggleButton({ name, control, defaultValue, disabled }) {
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  const handleClick = () => {
    if (!disabled) {
      field.onChange(field.value === 2 ? 1 : 2);
    }
  };

  return (
    <div
      className={`relative rounded-full w-12 h-6 transition duration-200 ease-in-out ${
        field.value === 2 ? "bg-blue-500" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleClick}
    >
      <div
        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform ${
          field.value === 2 ? "translate-x-full" : ""
        } transition duration-200 ease-in-out`}
      />
    </div>
  );
}

export default ToggleButton;
