import useAxios from "../custom-hooks/axios";

function PaymentForm() {
  const form_URL = "http://43.204.243.79:8000/api/v1/payment/transactions/1";

  const { data: paymentData, loading, error } = useAxios(form_URL);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {paymentData && <pre>{JSON.stringify(paymentData, null, 2)}</pre>}
    </div>
  );
}

export default PaymentForm;
