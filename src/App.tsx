import { FormProvider, useForm } from "react-hook-form";
import Dropzone from "./dropzone/Dropzone";

function App() {
  const methods = useForm({
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Dropzone name="images" accept="image/*" mode="append" multiple />
      </form>
    </FormProvider>
  );
}

export default App;
