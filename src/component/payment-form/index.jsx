import { form_URL } from "../../constants/api";
import CountryForm from "../country-form";
import CustomForm from "../custom-form";
import useAxios from "../custom-hooks/axios";

const PaymentForm = () => {
  const { data: paymentData, loading, error } = useAxios(form_URL);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <div>
        <h1 className="text-lg font-semibold">Deposit</h1>
        <div className="flex gap-5">
          {!!paymentData?.payment?.deposit[0]?.custom_input.length && (
            <CustomForm
              formData={paymentData?.payment?.deposit[0]?.custom_input}
            />
          )}
          {!!paymentData?.payment?.deposit[0]?.country_sorting.length && (
            <CountryForm
              formData={paymentData?.payment?.deposit[0]?.country_sorting}
            />
          )}
        </div>
      </div>
      <br />
      <br />
      <div>
        <h1 className="text-lg font-semibold">Withdraw</h1>
        <div className="flex gap-5">
          {!!paymentData?.payment?.withdrawl[0]?.custom_input.length && (
            <CustomForm
              formData={paymentData?.payment?.withdrawl[0]?.custom_input}
            />
          )}
          {!!paymentData?.payment?.withdrawl[0]?.country_sorting.length && (
            <CountryForm
              formData={paymentData?.payment?.withdrawl[0]?.country_sorting}
            />
          )}
        </div>
      </div>
      {/* <div>
        {paymentData?.payment?.deposit[0]?.country_sorting?.map((e) =>
          JSON.stringify(e)
        )}
        <br />
        {paymentData?.payment?.deposit[0]?.custom_input?.map((e) =>
          JSON.stringify(e)
        )}
      </div> */}
      {/* <CountryForm /> */}
    </div>
  );
};

export default PaymentForm;
