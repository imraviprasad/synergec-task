import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ToggleButton from "../../custom-component/toggle";

const schema = Yup.object().shape({
  cards: Yup.array().of(
    Yup.object().shape({
      country: Yup.string().required("Country is required"),
      sort: Yup.number(),
      action: Yup.bool(),
    })
  ),
});

const CountryForm = (props) => {
  const { formData } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cards: formData,
    },
  });

  // console.log(formData.map((e) => ({ country: e.country, sort: e.sort })));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center border-2 p-2 border-purple-800 bg-purple-400 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>Country Sorting</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-end relative">
            <div className="flex flex-col gap-3">
              <label className="mr-5">{`country ${index + 1}`}</label>

              <div className="flex gap-1 items-center mr-5">
                <Controller
                  name={`cards.${index}.country`}
                  control={control}
                  defaultValue={item.country}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="enter here"
                      className="border-2 border-gray-500 rounded-md mr-5"
                      disabled={item.action}
                    />
                  )}
                />

                <ToggleButton
                  name={`cards.${index}.sort`}
                  control={control}
                  defaultValue={item.sort}
                  disabled={item.action}
                />
              </div>
              {errors?.cards?.[index]?.country && (
                <p className="text-red-500 font-medium absolute bottom-[-25px]">
                  {errors.cards[index].country.message}
                </p>
              )}
            </div>

            <div className="h-fulljustify-end items-end">
              {fields.length !== 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded-lg bg-slate-500 w-7 text-xl font-extrabold mr-4"
                >
                  -
                </button>
              )}
              {fields.length === index + 1 && (
                <button
                  type="button"
                  onClick={() =>
                    append({ sort: 1, action: false, country: "" })
                  }
                  className="rounded-lg bg-slate-500 w-7 text-xl font-extrabold"
                >
                  +
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-5 bg-slate-800 rounded-lg w-[150px] text-center text-white m-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CountryForm;
